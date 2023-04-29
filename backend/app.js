import express from "express";
// Database
import _conecctionDatabase from "./source/db/db_connection.js";
// importacion de las rutas de express
import routeClientes from "./source/routes/clientes.js";
import routeProductos from "./source/routes/productos.js";
import routePedidos from "./source/routes/pedidos.js";
import routeUsuarios from "./source/routes/usuarios.js";
// Utilidades
import { config } from "dotenv";
import cors from "cors";
// Documentacion
import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "./source/docs/api-docs.js";
// env
config({ path: ".env" });

// Conection ala base de datos
_conecctionDatabase();

// instancia express
const app = express();
// configuracion de cors
const whiteList = process.env.URL_FRONTEND;
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Solicitud no permitida por cors"));
        }
    }
};
// Uso de utilidades de expres
app.use(cors(corsOptions));
app.use(express.json());
// leer datos de envio de formulario
app.use(express.urlencoded({ extended: true }));

// Rutas que utiliremos
app.use("/users", routeUsuarios);
app.use("/", routeClientes);
app.use("/", routeProductos);
app.use("/", routePedidos);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDOC));
// Archivos estaticos
app.use(express.static("uploads"));
// Configuracion para el servidor en produccion
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;
// // instancia del puerto y escucha

app.listen(PORT, HOST, () => {
    console.log(`Servidor funcionando en el puerto ${process.env.PORT}`);
});
