import Usuarios from "../models/usuarios.js";
import tokenJwt from "../helpers/Token_JWT.js";
// CONTROLADOR registrar usuario
const registrarUsuario = async (req, res) => {
    const { body } = req;
    const usuario = new Usuarios(body);

    try {
        usuario.save();
        res.status(200).json({ message: "Usuario creado correctamente" });
    } catch (error) {
        res.status(401).json({ message: "Hubo un error" });
        console.log(error);
    }
};

// CONTROLADOR autenticar usuario
const autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
        res.status(401).json({ message: "El correo no existe" });
        next();
    } else {
        if (!usuario.comparePassword(password, usuario.password)) {
            res.status(401).json({ message: "Password incorrecto,intentelo de nuevo" });
            next();
        } else {
            const token = tokenJwt.tokenSign(usuario);
            res.status(200).json({ token, usuario });
        }
    }
};

export default {
    registrarUsuario,
    autenticarUsuario
};
