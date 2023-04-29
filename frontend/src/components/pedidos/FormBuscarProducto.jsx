import React from "react";

const FormBuscarProducto = (props) => {
    const { buscarProducto, valorInput } = props;
    return (
        <>
            <form onSubmit={buscarProducto}>
                <legend>Busca los productos para crear un pedido</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input type="text"
                        placeholder="Nombre Productos"
                        name="productos"
                        onChange={valorInput}
                    />
                </div>
                <input type="submit"
                    className="btn btn-azul btn-block"
                    value="Buscar producto"
                />
            </form>
        </>
    );
};

export default FormBuscarProducto;
