import tokenJWT from "../helpers/Token_JWT.js";

// Verificar que existe el token en la cabcera
const authHeader = async (req, res, next) => {
    // Comprueba que el token existe
    const autorization = req.get("Authorization");

    if (!autorization) {
        // Si no existe devuelve un mensaje
        res.status(401).send("NO autorizado");
        return next();
    }
    // Si el token existe
    const token = autorization.split(" ").pop();
    const tokenJust = tokenJWT.verifyToken(token);
    // Si el token tiene el formato correcto pero tiene algun error
    if (!tokenJust) {
        res.status(401).json("No estas autorizado, vuelve a intentarlo");
    }
    // Si el token tiene el formato correcto y es valido
    next();
};

export default {
    authHeader
};
