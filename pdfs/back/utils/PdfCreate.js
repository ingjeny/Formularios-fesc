import pdf from "html-pdf";
import fs from "fs";

export const generarPDF = (htmlContent, callback) => {
  const options = { format: "Letter" };
  pdf.create(htmlContent, options).toFile(callback);
};

export const template = (documento) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
  
      table {
        width: 100%;
        border-collapse: collapse;
      }
  
      th, td {
        border: 1px solid #ccc;
        padding: 15px;
        text-align: left;
      }
  
      th {
        background-color: #f2f2f2;
      }
  
      h2 {
        color: #333;
        margin-top: 0;
      }
    </style>
    <title>Tabla con 3 Columnas</title>
  </head>
  <body>
    
    <h4>Asignatura: ${documento.asignatura}</h4>
    <h4>Codigo: ${documento.codigo}</h4>
    <h4>Creditos: ${documento.creditos}</h4>
    <h4>Nombre Docente: ${documento.docente}</h4>
    <p>COMPETENCIA DE LA ASIGNATURA: ${documento.competencia}</p>
  
    <table>
    <tr>
      <th>FECHAS</th>
      <th>CONTENIDOS</th>
      <th>TEORIA</th>
      <th>PRACTICAS</th>
      <th>TRABAJOS INDIVIDUALES</th>
      <th>OBSERVACIONES</th>
    </tr>
      ${documento.unidades.map((unidad, index) => {
        return `
        <tr>

        <td>
            <p>${unidad.fecha}</p>    
        </td>
        <td>
            <p>${unidad.contenido}</p>    
        </td>
        <td>
            <p>${unidad.horasTeoricas}</p>    
        </td>
        <td>
            <p>${unidad.horasPracticas}</p>    
        </td>
        <td>
            <p>${unidad.horasIndividuales}</p>    
        </td>
        <td>
            <p>${unidad.observaciones}</p>    
        </td>
        <tr>

        `
      })}
  </table>
  
  </body>
  </html>
  
`;
};
