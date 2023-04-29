import React, { Fragment, useEffect, useState,useContext } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useNavigate } from "react-router-dom";
// 
import { HOOKContext } from "../../hooks/authContext";

const NuevoCLiente = () => {
    // 
    const [auth, setAuth] = useContext(HOOKContext)

    // 
    const navigate = useNavigate();
    // Usestate donde utilizaremos cliente y set clientes para guardar el state
    const [cliente, setClientes] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });
    // funcion que leera los datos del formulario
    const datosFormulario = e => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        // Almacenar los datos del cliente en el state
        setClientes({
            // Hacemos una copia del state
            ...cliente,
            // lo setemos con los valores de aqui
            [e.target.name]: e.target.value
        });
    };

    // Funcion para enviar los datos del formulario
    const enviarFormulario = (e) => {
        // Prevenimos la recarga de la pagina
        e.preventDefault();
        // hacer post con axios
        clienteAxios.post("/clientes", cliente)
            .then(res => {
                // Si existe un codigoerror diferente a 201
                if (res.status !== 201) {
                    Swal.fire({
                        title: "El cliente ya esta esta registrado o existe",
                        text: "Hubo un conflicto de datos",
                        icon: "error"
                    });

                    // Redireccionamiento de url
                    navigate("/");
                    return;
                }
                /**
                 * Si el cliente se crea correctamente se emite un mensaje
                 * y redcciona a la url principal
                 */
                Swal.fire(
                    res.data,
                    "",
                    "success"
                );
                navigate("/");
            });

        // tambien le podemos aplicar este codigo
        // clienteAxios.post("/clientes", cliente)
        //     .then(res => {
        //         if(res.data.code === 11000){
        //             console.log("Hubo un conflicto con los datos");
        //         }else{
        //             console.log(res.data)
        //         }
        //     })
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
        if (!auth.token && (localStorage.getItem("token") !== auth.token)){
            navigate("/login")
        }
    }, [])
    return (
        <Fragment>
            <h2>Crear Nuevo Cliente</h2>
            <form onSubmit={enviarFormulario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={datosFormulario} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={datosFormulario} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" onChange={enviarFormulario}
                        disabled={validarFormulario()}
                    />
                </div>
            </form>
        </Fragment>

    );
};

export default NuevoCLiente;
