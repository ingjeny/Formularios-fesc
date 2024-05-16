import { CCard, CButton, CCardHeader, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import moment from 'moment'
import { OBTENER_DOCUMENTO_GET_ENDPOINT } from '../../connections/helpers/endpoints';
import axios from 'axios';

const DocumentCard= ({documento})=>{

    const descargarDocumento = async (id) => {
          const response = await axios.get(`${OBTENER_DOCUMENTO_GET_ENDPOINT}${id}`, {
            responseType: "blob",
          });
      
          const url = URL.createObjectURL(response.data);
          window.open(url, "_blank");

    }

    return(
    <CCard className="mt-3 mb-3">
        <CCardHeader className="mi-card">
            <CCardTitle>
                <strong>documento creado</strong>
            </CCardTitle> 
        </CCardHeader>
        <CCardBody>  
            <CCardText>
                Fecha de creación: {moment(documento.fechaCreacion).format('D[/]MM[/]YYYY')}
            </CCardText>
            <CCardText>
               Carrera: {documento.carrera}
            </CCardText>
            <CCardText>
               semestre: {documento.semestre}
            </CCardText>
            <div className='d-flex w-100 justify-content-center'>
                <CButton 
                    color="primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => descargarDocumento(documento.id)}
                >
                    Descargar
                </CButton>
            </div> 
        </CCardBody>
    </CCard>

    )
}

export {DocumentCard}
