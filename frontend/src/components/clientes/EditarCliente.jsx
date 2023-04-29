/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import clienteAxios from "../../config/axios";
import { HOOKContext } from "../../hooks/authContext";

const EditarCliente = () => {
    // hook JWT
    const [auth, setAuth] = useContext(HOOKContext)
    // 
    const { _id } = useParams();
    const navigate = useNavigate();
    // Usestate donde utilizaremos cliente y set clientes para guardar el state
    const [cliente, nuevoCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });
    // Consulta de datos a la DB
    const consultarApi = async () => {
        const cliente = await clienteAxios.get(`/clientes/${_id}`);

        // Guardamos el nuevo cliente en el state
        nuevoCliente(cliente.data);
    };
    useEffect(() => {
        consultarApi();
    }, []);

    // funcion que leera los datos del formulario
    const datosFormulario = e => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        // Almacenar los datos del cliente en el state
        nuevoCliente({
            // Hacemos una copia del state
            ...cliente,
            // lo setemos con los valores de aqui
            [e.target.name]: e.target.value
        });
    };

    // Funcion para enviar los datos del formulario
    const enviarFormulario = async (e) => {
        // Prevenimos la recarga de la pagina
        e.preventDefault();
        // hacer post con axios
        await clienteAxios.put(`/clientes/${_id}`, cliente, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
            .then(res => {
                //
                if (res.status !== 200) {
                    Swal.fire({
                        title: "Hubo un error",
                        text: "No se pudo actualizar la informacion del cliente",
                        icon: "error"
                    });

                    // Redireccionamiento de url
                    navigate("/");
                    return;
                }
                /**
                 *
                 */
                Swal.fire({
                    title: "Estas seguro?",
                    text: "Comprueba que los datos estan correctamente escritos",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No, cancelar",
                    confirmButtonText: "Si, actualizar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            "Actualizados!",
                            "Se ha actualizado correctamente",
                            "success"
                        );
                        navigate("/");
                    }
                });
            });
    };

    // funcion para validar el formulario
    const validarFormulario = () => {
        // Desestructuracion de cliente
        const { nombre, apellido, empresa, email, telefono } = cliente;
        // Revisar que las propiedades no esten vacias
        const validar = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
        return validar;
    };

    useEffect(() => {
        if (!auth.authenticacion && (localStorage.getItem("token") !== auth.token)) {
            navigate("/login")
        }
    }, [])
    return (
        <>
            <h2>Crear Nuevo Cliente</h2>
            <form onSubmit={enviarFormulario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" value={cliente.nombre} placeholder="Nombre Cliente" name="nombre" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" value={cliente.apellido} placeholder="Apellido Cliente" name="apellido" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" value={cliente.empresa} placeholder="Empresa Cliente" name="empresa" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" value={cliente.email} placeholder="Email Cliente" name="email" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" value={cliente.telefono} placeholder="Teléfono Cliente" name="telefono" onChange={datosFormulario} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Cliente" onChange={enviarFormulario}
                        disabled={validarFormulario()}
                    />
                </div>
            </form>
        </>

    );
};

export default EditarCliente;
