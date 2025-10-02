import express from "express";
import { loguearUsuario, registrarUsuario } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/register", registrarUsuario)
userRoutes.post("/login", loguearUsuario)

export default userRoutes;