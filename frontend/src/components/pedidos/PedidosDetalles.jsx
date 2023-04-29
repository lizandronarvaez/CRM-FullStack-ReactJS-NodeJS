import React from 'react'
import { useNavigate } from 'react-router'
import Delete from "../../assets/delete.svg"
import Edit from "../../assets/edit.svg"
import Pdf from "../../assets/pdf.svg"
const PedidosDetalles = (props) => {

    const { datosPedido, eliminarPedido, pedidoTerminado } = props
    // Navigate
    const navigate = useNavigate();

    // Destructuring pedido
    const { _id, cliente, pedido, total } = datosPedido;
    // Mostrar pdf pedido
    const pedidoPDF = () => navigate(`/pedidos/pdf/${_id}`)

    return (
        <>
            <tbody>
                <tr>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>{_id.substring(0, 10)}</td>
                    <td>{cliente._id.substring(0, 10)}</td>
                    <td>Pendiente</td>
                    <td>{cliente.nombre} {cliente.apellido}</td>
                    <td>{total}€</td>
                    <td>
                        <button type='button' onClick={pedidoPDF}><img src={Pdf} alt="icon pdf" /></button>
                        <button type='button'><img src={Edit} alt="icon edit" /></button>
                        <button type="button" onClick={() => eliminarPedido(_id)} ><img src={Delete} alt="icon delete" /></button>
                    </td>
                    <td> <input type="checkbox" className='completar-pedido' name="completar" onClick={pedidoTerminado} /></td>
                </tr>
            </tbody>
        </>
    )
}

export default PedidosDetalles