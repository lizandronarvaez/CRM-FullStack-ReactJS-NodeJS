import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const _conecctionDatabase = () => {
    const URI = process.env.DATABASE;
    mongoose.set("strictQuery", "false");
    // Conexion ala base de datos
    try {
        mongoose.connect(URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("Conectado ala base de datos");
    } catch (error) {
        console.log("Error en la conexion");
        console.log(error);
    }
};

export default _conecctionDatabase;
