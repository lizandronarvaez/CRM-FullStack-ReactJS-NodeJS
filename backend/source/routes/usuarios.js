import express from "express";
//
import usuariosControllers from "../controllers/usuariosControllers.js";
// instancia de express.router
const route = express.Router();
// Rutas usuarios

route
    // Ruta crear usuario
    .post("/registrar-usuario", usuariosControllers.registrarUsuario)
    .post("/iniciar-sesion", usuariosControllers.autenticarUsuario);

export default route;
