import express from "express";
import {
    loguearUsuario,
    registrarUsuario,
    eliminarUnUsuario,
    ListarTodosLosUsuarios,
    buscarUsuarioPorId,
    actualizarUsuario,
    crearPerfil,
    obtenerUnPerfil,
    crearNuevoUsuario,
    ListarTodosLosPerfilesDeUsuarios
} from "../controllers/userController.js";

//import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

//endpoints registro
userRoutes.post("/register", registrarUsuario);
userRoutes.post("/login", loguearUsuario);

//userRoutes.use(authMiddleware);

//endpoints de usuario:
userRoutes.post("/usuarios", crearNuevoUsuario);
userRoutes.get("/usuarios", ListarTodosLosUsuarios);
userRoutes.get("/usuarios", ListarTodosLosUsuarios);
userRoutes.get("/usuarios/:id", buscarUsuarioPorId);
userRoutes.delete("/usuarios/:id", eliminarUnUsuario);
userRoutes.put("/usuarios/:id", actualizarUsuario);

//endpoints perfil:
userRoutes.get("/usuarios/perfil", ListarTodosLosPerfilesDeUsuarios);
userRoutes.get("/usuarios/:id/perfil", obtenerUnPerfil);
userRoutes.post("/usuarios/:id/perfil", crearPerfil);


export default userRoutes;