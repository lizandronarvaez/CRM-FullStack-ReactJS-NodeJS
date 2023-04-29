import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    empresa: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Clientes", clientesSchema);
