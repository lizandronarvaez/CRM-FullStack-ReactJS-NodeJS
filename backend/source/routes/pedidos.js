import express from "express";
//
import pedidosControllers from "../controllers/pedidosControllers.js";
import authToken from "../middlewares/authToken.js";
// instancia de express.router
const route = express.Router();

route
// P E D I D O S

    // Crear un nuevo pedido
    .post("/pedidos/nuevo/:_id", authToken.authHeader, pedidosControllers.crearPedido)

    // Mostrar todos los pedidos
    .get("/pedidos", authToken.authHeader, pedidosControllers.mostrarPedidos)

    // Muestra los pedidos por su id
    .get("/pedidos/:_id", authToken.authHeader, pedidosControllers.mostrarPedido)

    // Actualizar un pedido
    .put("/pedidos/:_id", authToken.authHeader, pedidosControllers.actualizarPedido)

    // ELiminar un pedido
    .delete("/pedidos/:_id", authToken.authHeader, pedidosControllers.eliminarPedido);

export default route;
