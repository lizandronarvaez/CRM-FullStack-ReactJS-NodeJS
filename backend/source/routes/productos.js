import express from "express";
//
import productosControllers from "../controllers/productosControllers.js";
import authToken from "../middlewares/authToken.js";
// instancia de express.router
const route = express.Router();

route
/** P R O D U C T O S */

    // Agregar un nuevo producto
    .post("/productos", authToken.authHeader, productosControllers.subirArchivo, productosControllers.agregarProducto)

    // Muestra todos los productos disponibles
    .get("/productos", authToken.authHeader, productosControllers.mostarProductos)

    // Muestra solo un producto
    .get("/productos/:_id", authToken.authHeader, productosControllers.mostrarPoducto)

    // Actualiza un producto
    .put("/productos/:_id", authToken.authHeader, productosControllers.subirArchivo, productosControllers.actualizarProducto)

    // Eliminar un producto
    .delete("/productos/:_id", authToken.authHeader, productosControllers.eliminarProducto)

    // Buscar todos los productos por un query
    .get("/productos/clientes/:query", authToken.authHeader, productosControllers.buscarProductos);

export default route;
