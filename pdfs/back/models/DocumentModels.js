class DocumentCreateRequestModel {
    constructor(documento) {
        this.id = documento.documentId;
        this.asignatura = documento.asignatura;
        this.carrera = documento.carrera;
        this.codigo = documento.codigo;
        this.creditos = documento.creditos;
        this.semestre = documento.semestre;
        this.docente = documento.docente;
        this.competencia = documento.competencia;
        this.unidades = documento.unidades || [];
    }
}

class DocumentDataResModel {
    constructor(document) {
        this.document = document
    }
}

export {DocumentCreateRequestModel, DocumentDataResModel}