/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import clienteAxios from "../../config/axios";
const Cliente = ({ cliente }) => {
    // Extrae los valores del cliente
    const { _id, nombre, apellido, empresa, email, telefono } = cliente;
    // Elimina los clientes
    const eliminarCliente = (idCliente) => {
        Swal.fire({
            title: "Eliminar cliente, estas seguro?",
            text: "Si no estas seguro puedes cancelar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar cliente"
        }).then(async (result) => {
            // Si el resultado es eliminar
            if (result.isConfirmed) {
                // Hacemos una accion con axios y con delete
                await clienteAxios.delete(`/clientes/${idCliente}`)
                    .then(response => {
                        Swal.fire(
                            "Cliente Eliminado",
                            response.data,
                            "success"
                        );
                    });
            }
        });
    };

    return (

        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-pen-alt"></i>
                    Crear Pedido
                </Link>
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Cliente;
