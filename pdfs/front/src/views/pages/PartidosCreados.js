import {useState, useEffect} from "react"
/* import axios from "axios"
import { VER_DOCUMENTOS_GET_ENDPOINT } from "../../connections/helpers/endpoints"; */
import { CContainer , CCardBody, CRow, CCol } from '@coreui/react'
import { DocumentCard } from "../../components/DocumentosCreados/DocumentCard";
import dataDocumentosCreados from '../../connections/dataDocumentosCreados'; 


const DocumentosCreados= ()=>{

    const [documentos, setDocumentos] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(()=>{
        // axios.get(VER_DOCUMENTOS_GET_ENDPOINT)
        // .then(respuesta => {
        //     setPartidos(respuesta.data);
        //     setBuscando(false);
        // }).catch(err => {
        //     console.error(err);
        //     setBuscando(false);
        // })

        setDocumentos(dataDocumentosCreados);
        setBuscando(false);
    }, []);


    return (
        <CContainer  className="mt-3 mb-3">
            <CRow className="justify-content-md-center">
                <CCol sm="12" md="8" lg="6">
                    <h3 className="text-center">Documentos creados</h3>
                    <CCardBody>
                        {buscando ? "Cargando..." : (documentos.length ===0 && "No hay documentos disponibles")}
                        {documentos.map(documento => <DocumentCard key={documento.id} documento={documento}/>)}
                    </CCardBody>
                </CCol>
            </CRow>
        </CContainer >
        )
}

export default DocumentosCreados

