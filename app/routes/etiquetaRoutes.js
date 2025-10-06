import express from "express";

import {
    eliminarUnaEtiqueta,
    crearNuevaEtiqueta,
    asociarEtiquetas,
    listarEtiquetasDeTarea,
    actualizarEtiqueta,
} from "../controllers/etiquetaController.js";

const etiquetaRoutes = express.Router();

//endpoints de etiquetas:
etiquetaRoutes.post("/etiquetas", crearNuevaEtiqueta);
etiquetaRoutes.get("/tareas/:id/etiquetas", listarEtiquetasDeTarea);
etiquetaRoutes.put("/etiquetas/:id", actualizarEtiqueta);
etiquetaRoutes.delete("/etiquetas/:id", eliminarUnaEtiqueta);
etiquetaRoutes.post("/tareas/:id/etiquetas", asociarEtiquetas);


export default etiquetaRoutes;