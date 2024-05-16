import crypto from "crypto";
import bcrypt from "bcrypt";
import DocumentRepositorio from "../db/repositorios/DocumentRepositorio.js";
import { PDFDocument, rgb } from 'pdf-lib';

const verDocumentos = () => {
    return new Promise((resolver) => {
        resolver(DocumentRepositorio.verDocumentos())
    })
}

const generarPDF = async (datos) => {
    const doc = await PDFDocument.create();
    const page = doc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 12;

    const textOptions = {
        fontSize,
        color: rgb(0, 0, 0),
    };

    // Representar los datos en formato de tabla
    const tableData = [
        ['Asignatura', 'Carrera', 'Código', 'Créditos', 'Semestre', 'Docente', 'Competencia'],
        [datos.asignatura, datos.carrera, datos.codigo, datos.creditos, datos.semestre, datos.docente, datos.competencia],
    ];

    // Posición inicial de la tabla
    let x = 50;
    let y = height - 50;

    // Representar la tabla
    tableData.forEach((row) => {
        row.forEach((cell) => {
            page.drawText(cell.toString(), { x, y, ...textOptions }); // Convertir a string
            x += 100; // Ajusta el espaciado entre celdas
        });

        // Reinicia la posición para la próxima fila
        x = 50;
        y -= 20; // Ajusta el espaciado entre filas
    });

    // Representar las unidades en formato de lista
    y -= 20; // Ajusta el espaciado antes de la lista

    datos.unidades.forEach((unidad) => {
        const unidadText = `${unidad.fecha.toString()}, ${unidad.contenido.toString()}, ${unidad.horasTeoricas.toString()}, ${unidad.horasPracticas.toString()}, ${unidad.horasIndividuales.toString()}, ${unidad.observaciones.toString()}`;
        page.drawText(unidadText, { x: 50, y, ...textOptions }); // Convertir a string
        y -= 20; // Ajusta el espaciado entre elementos de la lista
    });

    const pdfBytes = await doc.save();
    return pdfBytes;
};


const descargarDocumento = async (id) => {
    try {
        const document = await DocumentRepositorio.findById(id);

        if (document == null) {
            throw new Error('No se ha encontrado el documento');
        }
      //  return document;
        const pdfBytes = await generarPDF(document);

        return pdfBytes;
    } catch (error) {
        throw new Error(error.message);
    }
};


const crearDocumento = (documento) => {
    return new Promise(async (resolver, rechazar) => {
        try {
            if (!documento.asignatura ||
                !documento.carrera ||
                !documento.codigo ||
                !documento.creditos ||
                !documento.semestre ||
                !documento.docente ||
                !documento.competencia ||
                !documento.unidades || documento.unidades.length === 0) {
                throw new Error('Datos incorrectos');
            }

            documento.documentId = crypto.randomBytes(20).toString('hex');

            const nuevoDocumento = await DocumentRepositorio.crearDocumento(documento);

            resolver(nuevoDocumento);
        } catch (error) {
            rechazar(error.message);
        }
    });
};

export default {descargarDocumento, verDocumentos, crearDocumento,generarPDF}