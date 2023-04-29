import React, { useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import PedidosDetalles from "./PedidosDetalles";
// hooks
import { HOOKContext } from "../../hooks/authContext";
import { useNavigate } from "react-router";
const PedidosTodos = () => {
    const navigate = useNavigate();
    // hook JWT
    const [auth, setAuth] = useContext(HOOKContext)
    // useState
    const [pedidosLista, setPedidoLista] = useState([]);
    // Consulta bd backend
    const bd_Backend = async () => {
        if (auth.token) {
            try {
                // Consulta ala bd de datos
                const consulta = await clienteAxios.get("/pedidos");
                const { data } = consulta;
                // Almacenar la data en el state
                setPedidoLista(data);
            } catch (error) {
                error.response.status === 500 ?
                    navigate("/login")
                    : null
            }
            return
        }
        navigate("/login")
    }

    // Eliminar pedidos de la lista
    const eliminarPedido = async (id) => {
        await clienteAxios.delete(`/pedidos/${id}`)
    }
    // COmprobar que el pedido se ha completado
    const pedidoTerminado = (e) => {
        if (e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent == "Pendiente") {
            e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Servido"
            return
        }
        e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Pendiente"

    }
    // useEffect
    useEffect(() => {
        // Funcion consulta bd_backend
        bd_Backend();
    }, [pedidosLista]);
    // console.log(pedidosLista)
    return (
        <>
            <h1>Lista de pedidos</h1>
            <div className="resumen">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nº Pedido</th>
                            <th>ClienteId</th>
                            <th>Estado Pedido</th>
                            <th>Cliente</th>
                            <th>Importe/Cantidad</th>
                            <th>Acciones</th>
                            <th>Realizado</th>
                        </tr>
                    </thead>
                    {
                        pedidosLista.map(pedido => (
                            <PedidosDetalles
                                key={pedido._id}
                                datosPedido={pedido}
                                eliminarPedido={eliminarPedido}
                                pedidoTerminado={pedidoTerminado}
                            />
                        ))
                    }
                </table>
            </div>
        </>
    );
};

export default PedidosTodos;
