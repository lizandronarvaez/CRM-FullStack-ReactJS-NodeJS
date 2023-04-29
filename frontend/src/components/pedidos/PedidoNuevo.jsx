import React, { useEffect, useState } from "react";
import FormBuscarProducto from "./FormBuscarProducto";
import { useNavigate, useParams } from "react-router";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import PedidosProductos from "./PedidoProductos";

const NuevoPedido = () => {
    // Extraer el id del cliente que va a realizar la compra
    const { _id } = useParams();
    // Navigate
    const navigate = useNavigate();
    // State para gaurdar los datos de la consulta ala api
    const [cliente, setCliente] = useState({});
    const [buscar, setBuscar] = useState("");
    const [productos, setProductos] = useState([]);
    const [totalPrecio, setTotalPrecio] = useState(0);

    // Desestructuracion de los datos del cliente
    const { nombre, apellido, empresa, telefono } = cliente;


    // Funcion para consultar la api
    const consultaBackend = async () => {

        // consulta hacia la api
        const resultado = await clienteAxios.get(`/clientes/${_id}`);

        // Guardamos los datos en el state
        setCliente(resultado.data);
    };

    // FUncion para buscar un producto
    const buscarProducto = async (e) => {
        e.preventDefault();

        // codigo para consultar los productos
        const resultado = await clienteAxios.get(`${import.meta.env.VITE_BASE_URL}/productos/clientes/${buscar}`);
        const { data } = resultado;

        // Si no existe un producto con el ese nombre nos emitira un mensaje
        if (!data[0]) {
            Swal.fire({
                title: "No existe el producto",
                text: "No hay resultados",
                icon: "error"
            });
        } else {
            const resultadoProducto = resultado.data[0];

            // Agregamos una llave a producto
            resultadoProducto.producto = resultado.data[0]._id;
            resultadoProducto.cantidad = 0;

            // Guardamos los datos en el state
            setProductos([...productos, resultadoProducto]);
        };
    };

    // FUncion para leer los datos del input de buscar producto
    const valorInput = (e) => {
        setBuscar(e.target.value);
    };


    // FUncion que leera el numero de productos
    const cantidadProductos = (e, i) => {
        // Hacemos una copia de los productos
        const todosProductos = [...productos]
        // Posicion de cada producto y accedemos a su valor
        productos[i].cantidad = Number(e.target.value)
        // Almacenar el las cantidades en el nuevo array
        setProductos(todosProductos)

    };
    // Funcion que calculara el total de los productos
    const totalProductos = () => {

        if (productos.length === 0) {
            setTotalPrecio(0);
            return;
        }

        // Calcular el total
        let totalPedido = 0;

        // TODO
        productos.map(producto => totalPedido += (producto.cantidad * producto.precio));

        // Guardar el total
        setTotalPrecio(totalPedido);

    };
    // ELiminar un producto de la lista
    const eliminarProductoLista = (id) => {
        // FIltramos todos los productos diferentes al que buscamos
        const eliminarProducto = productos.filter(producto => producto.producto !== id);
        // Guardamos en el state con los productos que no estamos eliminados
        setProductos(eliminarProducto)
        // console.log(productos)
    };

    // GUrdar el pedido en la base de datos
    const submitPedido = async (e) => {
        // Evitar actualizar la pagina
        e.preventDefault();
        // Creamos el objeto
        const pedido = {
            cliente: _id,
            pedido: productos,
            total: totalPrecio
        }
        // Guardamos en la base de datos
        const enviarPedido = await clienteAxios.post(`/pedidos/nuevo/${_id}`, pedido);
        //consultar que el pediido se ha guardado correcto
        enviarPedido.status === 201
            ? Swal.fire({
                position: "center",
                icon: "success",
                title: enviarPedido.data.mensaje,
                showConfirmButton: false,
                timer: 2000
            }).then(async result => {
                if (result) {
                    navigate(`/pedidos/clientes`)
                    return
                }
            }) : Swal.fire({
                position: "center",
                icon: "error",
                title: enviarPedido.data.message,
                showConfirmButton: false,
                timer: 1500
            })
    };
    // Usefect
    useEffect(() => {
        consultaBackend();
        totalProductos();
    }, [productos]);

    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos del cliente</h3>
                <p>{nombre} {apellido}</p>
                <p>{telefono}</p>
                <p>{empresa}</p>
            </div>
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                valorInput={valorInput}
            />
            <div className="resumen">
                <table>
                    {!productos.length
                        ? null
                        : <thead>
                            <tr>
                                <th>Nº Articulo</th>
                                <th>Nombre Articulo</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>}
                    {productos.map((producto, index) => (

                        <PedidosProductos
                            key={producto.producto}
                            producto={producto}
                            index={index}
                            cantidadProductos={cantidadProductos}
                            eliminarProductoLista={eliminarProductoLista}
                        />
                    ))}
                </table>
            </div>
            <div className="resumen-total">
                <div className="campo-total">
                    {
                        productos.length === 0
                            ? null
                            : <p> Total a pagar: <span>{totalPrecio.toFixed(2)}€</span></p>
                    }
                </div>
                <div className="campo">
                    {totalPrecio > 0
                        ? <form onSubmit={submitPedido}>
                            <input type="submit" className="btn btn-azul " value="Realizar Pedido" />
                        </form>
                        : null}
                </div>
            </div>
        </>
    );
};

export default NuevoPedido;
