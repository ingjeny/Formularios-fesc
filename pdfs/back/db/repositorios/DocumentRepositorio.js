import { randomUUID } from "crypto";
import { DocumentCreateRequestModel, DocumentDataResModel } from "../../models/DocumentModels.js";
import { conexion } from "../connection/dbConection.js";

const crearDocumento = async (documento) => {
    const con = conexion();

    documento.documentId = randomUUID().toString();
    const query = 'INSERT INTO documento (documentId, asignatura, carrera, codigo, creditos, semestre, docente, competencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const result = await con.query(query, [documento.documentId, documento.asignatura, documento.carrera, documento.codigo, documento.creditos, documento.semestre, documento.docente, documento.competencia]);
        
        if (documento.unidades && documento.unidades.length > 0) {
            const unidadQuery = 'INSERT INTO unidad (documentoId, fecha, contenido, horasTeoricas, horasPracticas, horasIndividuales, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)';
            for (const unidad of documento.unidades) {
                await con.query(unidadQuery, [documento.documentId, unidad.fecha, unidad.contenido, unidad.horasTeoricas, unidad.horasPracticas, unidad.horasIndividuales, unidad.observaciones]);
            }
        }

        return documento;
    } catch (err) {
        console.error('Error al insertar documento:', err);
        throw err;
    } finally {
        con.end();
    }
};

const verDocumentos = () => {
    return new Promise((resolve, reject) => {
        const con = conexion();
        let query = "SELECT * FROM documento";
        con.query(query, async (error, result) => {
            if (error) {
                console.error('Error al obtener documentos:', error);
                con.end();
                reject(error);
                return;
            }

            const obtenerDocumentos = async () => {
                const documentosPromesas = result.map(async (documentoRow) => {
                    try {
                        const unidades = await obtenerUnidades(documentoRow.documentId);
                        documentoRow.unidades = unidades;
                        return new DocumentCreateRequestModel(documentoRow);
                    } catch (error) {
                        throw error;
                    }
                });

                try {
                    const documentos = await Promise.all(documentosPromesas);
                    return documentos;
                } catch (error) {
                    throw error;
                }
            };

            const obtenerUnidades = (documentoId) => {
                return new Promise((resolve, reject) => {
                    let query = "SELECT * FROM unidad WHERE documentoId = ?"
                    con.query(query, [documentoId], (error, unidadesRows) => {
                        if (error) {
                            console.error('Error al obtener unidades:', error);
                            reject(error);
                            return;
                        }

                        const unidades = unidadesRows.map(unidadRow => ({
                            fecha: unidadRow.fecha,
                            contenido: unidadRow.contenido,
                            horasTeoricas: unidadRow.horasTeoricas,
                            horasPracticas: unidadRow.horasPracticas,
                            horasIndividuales: unidadRow.horasIndividuales,
                            observaciones: unidadRow.observaciones,
                        }));

                        resolve(unidades);
                    });
                });
            };

            try {
                const documentos = await obtenerDocumentos();
                con.end();
                resolve(documentos);
            } catch (error) {
                con.end();
                reject(error);
            }
        });
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const con = conexion();
        let query = 'SELECT * FROM documento WHERE documentId = ?'
        con.query(query, [id], async (error, result) => {
            if (error) {
                console.error('Error al obtener documentos:', error);
                con.end();
                reject(error);
                return;
            }

            const obtenerDocumentos = () => {
                return new Promise((resolve, reject) => {
                    const documentos = [];

                    const obtenerUnidades = (documentoId) => {
                        return new Promise((resolve, reject) => {
                            let query = 'SELECT * FROM unidad WHERE documentoId = ?';
                            con.query(query, [documentoId], (error, unidadesRows) => {
                                if (error) {
                                    console.error('Error al obtener unidades:', error);
                                    reject(error);
                                    return;
                                }

                                const unidades = unidadesRows.map(unidadRow => ({
                                    fecha: unidadRow.fecha,
                                    contenido: unidadRow.contenido,
                                    horasTeoricas: unidadRow.horasTeoricas,
                                    horasPracticas: unidadRow.horasPracticas,
                                    horasIndividuales: unidadRow.horasIndividuales,
                                    observaciones: unidadRow.observaciones,
                                }));

                                resolve(unidades);
                            });
                        });
                    };

                    const documentosPromesas = result.map(async (documentoRow) => {
                        try {
                            const unidades = await obtenerUnidades(documentoRow.documentId);
                            documentoRow.unidades = unidades;
                            const documento = new DocumentCreateRequestModel(documentoRow);
                            resolve(documento);
                        } catch (error) {
                            reject(error);
                        }
                    });

                    Promise.all(documentosPromesas)
                        .then((documentos) => resolve(documentos))
                        .catch((error) => reject(error));
                });
            };

            obtenerDocumentos()
                .then((documentos) => {
                    con.end();
                    resolve(documentos);
                    console.log(documentos)
                })
                .catch((error) => {
                    con.end();
                    reject(error);
                });
        });
    });
};

export default { crearDocumento, verDocumentos, findById };
