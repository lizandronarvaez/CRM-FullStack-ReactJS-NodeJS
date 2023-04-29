import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productosSchemas = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagenProducto: {
        type: String
    }
});

export default mongoose.model("Productos", productosSchemas);
