import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Importamos axios como funcion
import axiosCliente from "../../config/axios";

// COmponente cliente
import Cliente from "./Cliente";
import { HOOKContext } from "../../hooks/authContext";
import Swal from "sweetalert2/dist/sweetalert2.all";

const Clientes = () => {
    const navigate = useNavigate()
    // Creamos un state para guardar la data de los clientes
    const [clientes, setClientes] = useState([]);
    const [filtrarDatos, setFiltrarDatos] = useState([]);
    const [buscarCliente, setBuscarCliente] = useState("");
    // hookContext
    const [auth, setAuth] = useContext(HOOKContext)
    // Creamos una funcion para traer la data de clientes
    const consultaClientes = async () => {

        // Consulta ala base de datos
        const clientes = await axiosCliente.get("/clientes");
        const { data } = clientes;
        // Guardamos la data en el state
        setClientes(data);
    };

    // Buscar que un cliente existe
    const handleBusquedaCliente = e => {
        e.preventDefault()
        setBuscarCliente(e.target.value);
    };

    const filtrarCliente = (e) => {
        e.preventDefault()
        // eslint-disable-next-line array-callback-return
        const clienteExiste = clientes.filter(cliente => {
            return (cliente.nombre + " " + cliente.apellido)
                .toString()
                .toLowerCase()
                .includes(buscarCliente.toLowerCase().trim()) ||
                cliente.empresa
                    .toString()
                    .toLowerCase()
                    .includes(buscarCliente.toLowerCase()) ||
                cliente.email
                    .toString()
                    .toLowerCase()
                    .includes(buscarCliente.toLowerCase());
        });
        // Si buscamos un cliente y existe
        if (clienteExiste.length !== 0) {
            setFiltrarDatos(clienteExiste);
            return
        }
        // si el cliente no existe
        Swal.fire({
            icon: 'error',
            title: 'No se encuentra el cliente',
            text: "Hubo un error en la busqueda",
        })
    };

    // Utilizamos ussefect para que actualize los cambios
    useEffect(() => {
        consultaClientes();
        if (!auth.authentication) {
            navigate("/login")
            return
        }
    }, [filtrarDatos]);

    return (
        <Fragment>
            <h2>Clientes</h2>
            <form onSubmit={filtrarCliente}>
                <div className="busqueda-cliente">
                    <label htmlFor="busca-cliente">Buscar un cliente</label>
                    <input type="text"
                        placeholder="Introduce nombre, email o empresa"
                        name="buscar-cliente"
                        value={buscarCliente}
                        onChange={handleBusquedaCliente}
                    />
                    <input type="submit"
                        className="btn btn-searchCliente"
                        value="Buscar cliente"
                    />
                </div>
            </form>
            <Link
                to={"/clientes/nuevo-cliente"}
                className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {
                filtrarDatos.map(cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))
                }
            </ul>

        </Fragment>
    );
};

export default Clientes;
