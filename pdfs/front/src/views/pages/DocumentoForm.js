import React, { useState } from "react";
import { CREAR_DOCUMENTO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import axios from "axios";

function DocumentFomr() {
  const [asignatura, setAsignatura] = useState("");
  const [carrera, setCarrera] = useState("");
  const [codigo, setCodigo] = useState("");
  const [creditos, setCreditos] = useState("");
  const [semestre, setSemestre] = useState("");
  const [docente, setDocente] = useState("");
  const [competencia, setCompetencia] = useState("");

  const [unidades, setUnidades] = useState([
    {
      info: [
        {
          fecha: "",
          contenido: "",
          horasTeoricas: "",
          horasPracticas: "",
          horasIndividuales: "",
          observaciones: "",
        },
      ],
    },
  ]);

  const agregarUnidad = () => {
    setUnidades([
      ...unidades,
      {
        info: [
          {
            fecha: "",
            contenido: "",
            horasTeoricas: "",
            horasPracticas: "",
            horasIndividuales: "",
            observaciones: "",
          },
        ],
      },
    ]);
  };

  const agregarInfo = (unidadIndex) => {
    const nuevaInfo = {
      fecha: "",
      contenido: "",
      horasTeoricas: "",
      horasPracticas: "",
      horasIndividuales: "",
      observaciones: "",
    };

    const nuevasUnidades = [...unidades];
    nuevasUnidades[unidadIndex].info.push(nuevaInfo);
    setUnidades(nuevasUnidades);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      asignatura,
      carrera,
      codigo,
      creditos,
      semestre,
      docente,
      competencia,
      unidades,
    };

    let unidad = data.unidades.map(unidad => unidad.info[0]);
    data.unidades = unidad;

    try {
      axios
        .post(CREAR_DOCUMENTO_POST_ENDPOINT,data)
        .then((respose) => console.log(respose))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Asignatura:</label>
          <input
            type="text"
            className="form-control"
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-4">
            <div className="mb-3">
              <label>Docente:</label>
              <input
                type="text"
                className="form-control"
                value={docente}
                onChange={(e) => setDocente(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="mb-3">
              <label>Código:</label>
              <input
                type="text"
                className="form-control"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="mb-3">
              <label>Créditos:</label>
              <input
                type="text"
                className="form-control"
                value={creditos}
                onChange={(e) => setCreditos(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="mb-3">
              <label>Semestre:</label>
              <input
                type="text"
                className="form-control"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="mb-3">
              <label>Carrera:</label>
              <input
                type="text"
                className="form-control"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Competencia de la asignatura:</label>
          <input
            type="text"
            className="form-control"
            value={competencia}
            onChange={(e) => setCompetencia(e.target.value)}
          />
        </div>
        <hr></hr>
        {unidades.map((unidad, unidadIndex) => (
          <div key={unidadIndex} className="mb-3">
            <h3>Unidad {unidadIndex + 1}</h3>
            {unidad.info.map((info, infoIndex) => (
              <div key={infoIndex} className="row">
                <div className="col-2">
                  <div className="mb-3">
                    <label>Fecha:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={info.fecha}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[infoIndex].fecha =
                          e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="mb-3">
                    <label>Contenido:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={info.contenido}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[infoIndex].contenido =
                          e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="mb-3">
                    <label>Horas Teóricas:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={info.horasTeoricas}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[
                          infoIndex
                        ].horasTeoricas = e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="mb-3">
                    <label>Horas Prácticas:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={info.horasPracticas}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[
                          infoIndex
                        ].horasPracticas = e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="mb-3">
                    <label>Horas Individuales:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={info.horasIndividuales}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[
                          infoIndex
                        ].horasIndividuales = e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="mb-3">
                    <label>Observaciones:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={info.observaciones}
                      onChange={(e) => {
                        const nuevasUnidades = [...unidades];
                        nuevasUnidades[unidadIndex].info[
                          infoIndex
                        ].observaciones = e.target.value;
                        setUnidades(nuevasUnidades);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => agregarInfo(unidadIndex)}
              className="btn btn-primary d-flex"
              style={{ marginLeft: "80%" }}
            >
              Agregar Información
            </button>
            <hr></hr>
          </div>
        ))}
        <button
          type="button"
          onClick={agregarUnidad}
          className="btn btn-primary me-3"
        >
          Agregar Unidad
        </button>
        <button type="submit" className="btn btn-success">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default DocumentFomr;
