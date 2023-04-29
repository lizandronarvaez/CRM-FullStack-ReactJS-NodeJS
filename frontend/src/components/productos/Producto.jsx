import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import clienteAxios from "../../config/axios";
const Producto = ({ productos }) => {
    // Eliminar un producto de la lista
    const eliminarProducto = (idProducto) => {
        Swal.fire({
            title: "Eliminar producto, estas seguro?",
            text: "Si no estas seguro puedes cancelar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar producto"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await clienteAxios
                    .delete(`/productos/${idProducto}`)
                    .then(response => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Producto eliminado correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        }
                        );
                    });
            }
        });
    };

    // Extraemos los valores de los productos;
    const { _id, nombre, precio, imagenProducto } = productos;
    // Retornamos al dom
    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}€</p>
                {imagenProducto
                    ? <img className="img-productos" src={`${import.meta.env.VITE_BASE_URL}/${imagenProducto}`} alt="imagen producto" />
                    : null
                }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar-producto/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => { eliminarProducto(_id); }}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
};

export default Producto;
