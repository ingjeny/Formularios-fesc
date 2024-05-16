import React from 'react'
const DocumentosCreados= React.lazy(()=> import('../views/pages/DocumentosCreados'))
const DocumentosForm= React.lazy(()=> import('../views/pages/DocumentoForm'))
const Colors = React.lazy(() => import('../views/theme/colors/Colors'))
const Accordion = React.lazy(() => import('../views/base/accordion/Accordion'))

const routes = [
  { path: '/', name: 'Documentos creados', element: DocumentosCreados },
  { path: '/create', name: 'Crear Documento', element: DocumentosForm },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/base/accordion', name: 'Accordion', element: Accordion }
]

export default routes
