import express from "express";
// Controladores de rutas
import clientesControllers from "../controllers/clientesControllers.js";
// Verifiacion de token
import authToken from "../middlewares/authToken.js";
// instancia de express.router
const route = express.Router();
// rutas
route
/** C L I E N T E S */

    .post("/clientes", authToken.authHeader, clientesControllers.crearCliente)

    // Obetener todos los clientes
    .get("/clientes", authToken.authHeader, clientesControllers.mostrarClientes)

    // Obtener solo un cliente
    .get("/clientes/:_id", authToken.authHeader, clientesControllers.mostrarUnCliente)

    // Actualizar un cliente
    .put("/clientes/:_id", authToken.authHeader, clientesControllers.actualizarCliente)

    // Eliminar un cliente
    .delete("/clientes/:_id", authToken.authHeader, clientesControllers.eliminarCLiente);

export default route;
