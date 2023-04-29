import { fileURLToPath } from "url";
import path, { dirname } from "path";
//
import multer from "multer";
import shortid from "shortid";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Configuracion de multer
const uploads = path.resolve(__dirname, "../../uploads");
// En la configuracion de multer hay que ponerlo en orden ya que se ejecuta de arriba abajo
const configuracionMulter = {
    limits: { fileSize: 100000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploads);
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split("/")[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    // Filtar archivos para que solo se suben determinados archivos que cumplan con la extension
    fileFilter (req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
            // si el formato es correcto ejectura true
            cb(null, true);
        } else {
            // Si es falso ejectura false
            cb(new Error("Formato de archivo no valido."), false);
        }
    }
};
const upload = multer(configuracionMulter).single("imagenProducto");

export default upload;
