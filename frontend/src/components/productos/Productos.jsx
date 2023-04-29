/* eslint-disable array-callback-return */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner/Spinner";
// 
import { HOOKContext } from "../../hooks/authContext";

const Productos = () => {
    const navigate = useNavigate();
    // hook jwt
    const [auth, setAuth] = useContext(HOOKContext)
    // usaremos los state para consultar y guardar los productos
    const [productos, setProductos] = useState([]);

    // Query hacia la api backend
    const consultarApiBackend = async () => {
        if(auth.token){
            try {
                // Consulta hacia la api
                const productos = await clienteAxios.get("/productos");
                // Desestructuracion de la respuesta
                const { data } = productos;
                setProductos(data);
            } catch (error) {
                error.response.status === 500 ?
                navigate("/login")
                : null
            }
            return
        }
        navigate("/login")
    };
    // useEffect
    useEffect(() => {
        consultarApiBackend();
    }, [productos]);

    // Dom
    return (
        <Fragment>

            <h2>Productos</h2>

            <Link to={"/productos/nuevo-producto"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.length === 0
                    ? <Spinner />
                    : productos.map(producto => (
                        <Producto
                            key={producto._id}
                            productos={producto}
                        />
                    ))}
            </ul>
        </Fragment>

    );
};

export default Productos;
