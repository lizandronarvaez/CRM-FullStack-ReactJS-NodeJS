import Pedidos from "../models/pedidos.js";
/** Crear pedido */
const crearPedido = async (req, res, next) => {
    const { body } = req;
    try {
        // Si no existen datos para crear el pedido
        if (Object.entries(body).length === 0) {
            res.status(400).send("Error al crear el pedido");
            return;
        }
        // Si existe Creamos el pedido
        const pedido = new Pedidos(body);
        // Guardamos el pedidos
        await pedido.save();
        // Devolvermos un mensaje al cliente
        res.status(201).json({ mensaje: "Pedido Creado Corretamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next(error);
    }
};

/** Mostrar todos los pedidos */
const mostrarPedidos = async (req, res, next) => {
    try {
        // Buscamos todos los pedidos
        const pedidos = await Pedidos.find()
            // Populate busca lo relacionado con un cliente
            .populate("cliente")
            // Busca por el id haciendo referencia al objecto que queremos mostrar
            .populate({
                path: "pedido.producto",
                model: "Productos"
            });

        // Devolvemos un mensaje al cliente
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(400).json(error.mensaje);
        next();
    }
};

/** BUscar solo un pedido  */

const mostrarPedido = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // BUscamos el pedido por el id
        const pedido = await Pedidos.findById(_id)
            .populate("cliente")
            .populate({
                path: "pedido.producto",
                models: "Productos"
            });
        // Comprueba que existe el pedido
        if (!pedido) {
            res.status(400).json({ mensaje: "No se encontro ningun pedido" });
            return next();
        }

        // Si existe el pedido muestra el pedido
        res.status(200).json(pedido);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Actualizar un pedido
const actualizarPedido = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // Buscamos el pedido
        const pedidoNuevo = await Pedidos
            .findByIdAndUpdate(
                _id,
                req.body,
                {
                    new: true
                })
            .populate("cliente")
            .populate({
                path: "pedido.producto",
                models: "Productos"
            });

        res.status(200).json(pedidoNuevo);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Eliminar un pedido
const eliminarPedido = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // Buscamos el pedido y lo eliminamos
        const pedido = await Pedidos.findByIdAndDelete(_id);
        if (!pedido) {
            res.status(400).json("El pedido no existe o ya fue eliminado");
            return next();
        }
        // Si todo va bien
        res.status(201).json("Pedido Eliminado Correctamente");
    } catch (error) {
        // Si hubiese un error al eliminar el pedido
        res.status(400).json("Hubo un error");
    }
};

export default {
    crearPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
};
