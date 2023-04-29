import Productos from "../models/productos.js";
import upload from "../middlewares/multer.js";
// Subir imagen para crear un archivo
const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json(error.message);
        }
        next();
    });
};
// Crear un nuevo producto
const agregarProducto = async (req, res, next) => {
    const { body } = req;
    const producto = new Productos(body);
    try {
        if (req.file) {
            producto.imagenProducto = req.file.filename;
        }
        // Guardamos el producto
        await producto.save();
        // Devolvemos con un stado de que se ha creado correctamente
        res.status(201).json({ mensaje: "Se agrego un nuevo producto correctamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Mostrar todos los productos
const mostarProductos = async (req, res, next) => {
    try {
        // Buscar todos los productos
        const productos = await Productos.find();
        // Mostrar todos los productos
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Mostar un solo producto
const mostrarPoducto = async (req, res, next) => {
    const { _id } = req.params;
    // Busca el producto con el id que pasaremos por parametro
    const producto = await Productos.findById(_id);
    // Si no existe el producto nos mostrara un mensaje
    if (!producto) {
        res.status(400).json({ mensaje: "No existe el producto" });
        return next();
    }
    // Si existe el producto lo mostrara
    res.status(200).json(producto);
};

// Actualizar producto
const actualizarProducto = async (req, res, next) => {
    // Buscamos el producto con el id
    const { _id } = req.params;
    // Try
    try {
        // Contruye un nuevo prducto
        const productoNuevo = req.body;
        // Verificamos si hay una imagen nueva
        if (req.file) {
            productoNuevo.imagenProducto = req.file.filename;
        } else {
            const productoActual = await Productos.findById(_id);
            productoNuevo.imagenProducto = productoActual.imagenProducto;
        }

        const actualizarProducto = await Productos
            .findByIdAndUpdate(
                _id,
                productoNuevo, {
                    new: true
                });
        res.status(200).json({ actualizarProducto, message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Eliminar producto
const eliminarProducto = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // BUscamos el producto por su id en la base de datos
        const producto = await Productos.findByIdAndDelete(_id);
        // Si el producto ya fue eliminado nos devolvera un mensaje
        if (!producto) {
            res.status(400).json({ mensaje: "El producto no existe o ya fue eliminado" });
        }
        // Si va todo bien, nos devolver un stado 200-ok y un mensaje
        res.status(204).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        if (error) {
            // SI existe un error nos devovlera este mensaje y realizara un next()
            res.status(400).json({ mensaje: "Hubo un error al eliminar el producto" });
            next();
        }
    }
};
// consultar todos los productos por un query
const buscarProductos = async (req, res, next) => {
    // Obtener el parametro de la ruta
    const { query } = req.params;
    try {
        // Consulta con un query hacia la base de datos para buscar un producto por un nombre
        const producto = await Productos.find({ nombre: new RegExp(query, "i") });
        // Si existe el producto le enviamos un status OK
        res.status(200).json(producto);
    } catch (error) {
        // Si no encuentra el producto devuelve un error
        res.status(404).json({ message: "El producto que busca no existe" });
        next();
    }
};
export default {
    subirArchivo,
    agregarProducto,
    mostarProductos,
    mostrarPoducto,
    actualizarProducto,
    eliminarProducto,
    buscarProductos
};
