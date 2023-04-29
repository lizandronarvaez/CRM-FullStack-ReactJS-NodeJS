import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useNavigate } from "react-router";
import { HOOKContext } from "../../hooks/authContext";

const NuevoProducto = () => {
    const [auth, setAuth] = useContext(HOOKContext)

    // navigate
    const navigate = useNavigate();
    // Creamos los stastate para crear los productos
    const [agregarProducto, setAgregarProducto] = useState({
        nombre: "",
        precio: ""
    });
    // Creamos otro state para el archivo de imagen
    const [imgProducto, setImgProducto] = useState("");

    // Funcion para leer datos de el fomrulario
    const setFormulario = e => {
        // Agregamos los valores los state
        setAgregarProducto({
            // Se realiza una copia cada ves que escribamos en un campo y lo copia, sino se hace asi, el state empieza vacio y no guarda nada
            ...agregarProducto,
            [e.target.name]: [e.target.value]
        });
    };
    const imagenProductoForm = e => {
        // Acceder a los archivos del input
        // console.log(e.target.files[0].name);
        // State en el que guardaremos el nombre de la imagen
        setImgProducto(e.target.files[0]);
    };
    // funcion para validar el formulario
    const validarFormulario = () => {
        // Desestructuracion del producto
        const { nombre, precio } = agregarProducto;
        // Revisar que las propiedades no esten vacias
        const validar = nombre === undefined || precio === undefined;
        return validar;
    };

    // Enviar datos del formulario
    const submitFormulario = async (e) => {
        // Desestructuracion de los datos del state
        const { nombre, precio } = agregarProducto;
        // Prevenir la recarga de la pagina
        e.preventDefault();
        // Crear el formData y agregar los valores
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("imagenProducto", imgProducto);
        try {
            // accion de post hacia backend con axios
            const enviarProducto = await clienteAxios.post("/productos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            // Evaluamos los resultados
            if (enviarProducto.status === 201) {
                // Mostramos un mensaje si todo esta bien
                Swal.fire(
                    "Producto creado",
                    enviarProducto.data.mensaje,
                    "success"
                );
                // Redireccionamos hacia la ruta principal
                navigate("/productos");
            }
        } catch (error) {
            Swal.fire("Error al crear el producto", error.response.data, "error");
        }
    };

    useEffect(() => {
        // VERIFICAR EL JWT
        if (!auth.token) {
            navigate("/login")
        }
    }, [])
    return (
        <>
            <h2>Nuevo Producto</h2>

            <form onSubmit={submitFormulario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" onChange={setFormulario} placeholder="Nombre Producto" name="nombre" />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" onChange={setFormulario} name="precio" min="0.00" step="0.01" placeholder="Precio" />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" onChange={imagenProductoForm} name="imagen" />
                </div>

                <div className="enviar">
                    <input type="submit" disabled={validarFormulario()} className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </>
    );
};

export default NuevoProducto;
