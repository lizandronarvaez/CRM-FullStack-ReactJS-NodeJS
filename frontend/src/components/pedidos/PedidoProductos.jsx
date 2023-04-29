import React from "react";
import Delete from "../../assets/delete.svg";
const PedidosProductos = (props) => {
    // Desestructuracion de los props
    const { index, producto, cantidadProductos, eliminarProductoLista } = props;
    // Desestructuracion de los productos
    const { nombre, precio } = producto;
    return (
        <tbody>
            <tr>
                <td>{index + 1}</td>
                <td>{nombre}</td>
                <td>{precio}€</td>
                <td><input type="number" defaultValue={0} min={0} onChange={(e) => cantidadProductos(e, index)} /></td>
                <td><button type="button" onClick={() => eliminarProductoLista(producto._id)} ><img src={Delete} alt="icon delete" /></button></td>
            </tr>
        </tbody>
    );
};

export default PedidosProductos;
