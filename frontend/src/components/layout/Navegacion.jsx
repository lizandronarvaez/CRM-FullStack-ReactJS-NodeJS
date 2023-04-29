import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// Icons
import Home from "../../assets/home.svg";
import Users from "../../assets/users.svg";
import Cart from "../../assets/cart.svg";
import TableList from "../../assets/table-list.svg";
import { HOOKContext } from "../../hooks/authContext";
const Navegacion = () => {
    const [auth, setAuth] = useContext(HOOKContext);

    return (
        !auth.authentication  ? null :
            <aside className="sidebar col-3">
                <h2>Administración</h2>
                <nav className="navegacion">
                    <Link to={"/users"} className="clientes"><img src={Home} alt="icon" />Dashboard</Link>
                    <Link to={"/clientes"} className="clientes"><img src={Users} alt="icon" />Clientes</Link>
                    <Link to={"/productos"} className="productos"><img src={Cart} alt="icon" />Productos</Link>
                    <Link to={"/pedidos/clientes"} className="pedidos"> <img src={TableList} alt="icon" />Pedidos</Link>
                </nav>
            </aside>

    );
};

export default Navegacion;
