/* eslint-disable no-multiple-empty-lines */
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
// import Spinner from "../layout/Spinner/Spinner";
const EditarProducto = () => {
    // Navigate
    const navigate = useNavigate();
    // Obtenemos el id del producto que queremos actualizar
    const { _id } = useParams();
    // State donde utilizaremos el producto y el set cliente para guardar los datos
    const [actualizarProducto, setActualizarProducto] = useState({
        nombre: "",
        precio: "",
        imagenProducto: ""
    });
    // / Creamos otro state para el archivo de imagen
    const [imgProducto, setImgProducto] = useState("");
    // Desestructuracion de los productos
    const { nombre, precio, imagenProducto } = actualizarProducto;
    // Consulta hacia la api backend
    const consultarBackend = async () => {
        // Query hacia la api backend
        const productos = await clienteAxios.get(`/productos/${_id}`);
        // Desectructuracion de la data
        const { data } = productos;
        // Guardamos la data en el state
        setActualizarProducto(data);
    };

    // Funcion para leer los datos del formulario
    const setFormulario = e => {
        setActualizarProducto({
            ...actualizarProducto,
            [e.target.name]: [e.target.value]
        });
    };
    // Imagen del producto
    const archivoImg = e => {
        setImgProducto(e.target.files[0]);
    };

    // Enviar formulario
    const actualizarFormProducto = async (e) => {
        // Prevenir la recarga de la pagina
        e.preventDefault();
        const { nombre, precio } = actualizarProducto;
        // Crear el formData y agregar los valores
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("imagenProducto", imgProducto);
        try {
            // accion de post hacia backend con axios
            const enviarProducto = await clienteAxios.put(`/productos/${_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            // Evaluamos los resultados
            if (enviarProducto.status === 200) {
                // Mostramos un mensaje si todo esta bien
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: enviarProducto.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                // Redireccionamos hacia la ruta principal
                navigate("/productos");
            }
            console.log(enviarProducto);
        } catch (error) {
            Swal.fire("Error al actualizar el producto", error.response.data, "error");
        }
    };

    // useEffect
    useEffect(() => {
        consultarBackend();
    }, []);
    // if (!nombre) return <Spinner />;
    return (
        <Fragment>
            <h2>Editar Producto</h2>

            <form onSubmit={actualizarFormProducto}>
                <legend>Actualiza los datos de tus productos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" onChange={setFormulario} value={nombre} placeholder="Nombre Producto" name="nombre" />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" onChange={setFormulario} value={precio} name="precio" min="0.00" step="0.01" placeholder="Precio" />
                </div>

                <div className="campo">
                    <label>Imagen:</label>

                    {imagenProducto
                        ? <img src={`http://localhost:5000/${imagenProducto}`} alt="image producto" width={200} />
                        : null}
                    <input type="file" onChange={archivoImg} name="imagen" />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Producto" />
                </div>
            </form>
        </Fragment>
    );
};

export default EditarProducto;
