import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import DocumentService from "../services/DocumentService.js";
import {
  DocumentCreateRequestModel,
  DocumentDataResModel,
} from "../models/DocumentModels.js";
import DocumentRepositorio from "../db/repositorios/DocumentRepositorio.js";
import { generarPDF, template } from "../utils/PdfCreate.js";
import fs from "fs";

const router = Router();

router.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await DocumentRepositorio.findById(id);
    const templateHTML = template(data);

    generarPDF(templateHTML, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      }

      const { filename } = response;
      const fileStream = fs.createReadStream(filename);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

      fileStream.pipe(res);
      fileStream.on("end", () => {
        fs.unlinkSync(filename);
      });
    });
  } catch (err) {
    respuestasHttp.error(req, res, "Error al leer el documento", err, 500);
  }
});

router.get("/get", (req, res) => {
  DocumentService.verDocumentos()
    .then((array) => {
      respuestasHttp.exito(req, res, array, 200);
    })
    .catch((err) => {
      respuestasHttp.error(
        req,
        res,
        "No es posible leer los documentos",
        err,
        400
      );
    });
});

router.post("/add", (req, res) => {
  DocumentService.crearDocumento(new DocumentCreateRequestModel(req.body))
    .then((document) => {
      respuestasHttp.exito(
        req,
        res,
        new DocumentCreateRequestModel(document),
        201
      );
    })
    .catch((err) => {
      respuestasHttp.error(
        req,
        res,
        "No es posible crear el documento",
        err,
        400
      );
    });
});

export default router;
