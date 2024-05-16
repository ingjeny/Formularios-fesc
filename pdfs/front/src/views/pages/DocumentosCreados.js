import { useState, useEffect } from "react";

import { VER_DOCUMENTOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { CContainer, CCardBody, CRow, CCol } from "@coreui/react";
import { DocumentCard } from "../../components/DocumentosCreados/DocumentCard";
import axios from "axios";

const DocumentosCreados = () => {
  const [documentos, setDocumentos] = useState([]);
  const [buscando, setBuscando] = useState(true);

  const obtenerFormularios = async () => {
    try {
      const response = await axios.get(VER_DOCUMENTOS_GET_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error("Error al obtener formularios:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await obtenerFormularios();
        setDocumentos(data);
      } catch (error) {
      } finally {
        setBuscando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CContainer className="mt-3 mb-3">
      <CRow className="justify-content-md-center">
        <CCol sm="12" md="8" lg="6">
          <h3 className="text-center">Documentos creados</h3>
          <CCardBody>
            {buscando
              ? "Cargando..."
              : documentos.length === 0 && "No hay documentos disponibles"}
            {documentos.map((documento, index) => (
              <DocumentCard key={index} documento={documento} />
            ))}
          </CCardBody>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DocumentosCreados;
