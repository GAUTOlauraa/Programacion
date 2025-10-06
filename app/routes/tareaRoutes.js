import express from "express";
import {
    eliminarUnaTarea,
    obtenerTareasDeUsuario,
    crearNuevaTarea,
    actualizarTarea,
} from "../controllers/tareaController.js";


const tareaRoutes = express.Router();

//endpoint de tareas:
tareaRoutes.post("/usuarios/:id/tareas", crearNuevaTarea);
tareaRoutes.get("/usuarios/:id/tareas", obtenerTareasDeUsuario);
tareaRoutes.delete("/tareas/:id", eliminarUnaTarea);
tareaRoutes.put("/tareas/:id", actualizarTarea);

export default tareaRoutes;

