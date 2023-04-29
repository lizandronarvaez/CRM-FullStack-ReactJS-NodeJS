import { useContext } from "react";
// Componentes de la pagina
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
// Componentes de los routes
// routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Dashboard
import Dashboard from "./components/layout/Dashboard";
// CLIENTES
import Clientes from "./components/clientes/Clientes";
import NuevoCLiente from "./components/clientes/NuevoCLiente";
import EditarCliente from "./components/clientes/EditarCliente";
// Productos
import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";
// Pedidos
import PedidosTodos from "./components/pedidos/PedidosTodos";
import PedidoNuevo from "./components/pedidos/PedidoNuevo";
import PedidoPDF from "./components/pedidos/PedidoPDF";
// Login Usuarios
import Login from "./components/authentication/Login";
// hookContent
import { HOOKContext, AUTHContext } from "./hooks/authContext";
import Home from "./components/layout/Home";

const App = () => {
    // Uso del hook context
    const [auth, setAuth] = useContext(HOOKContext)

    return (
        <Router>
            <>
                <AUTHContext value={[auth, setAuth]}>

                    <Header />

                    <div className="grid contenedor contenido-principal">

                        <Navegacion />

                        <main className="caja-contenido col-9">
                            <Routes>
                                <Route exact path="/" Component={Home} />
                                <Route exact path="/users" Component={Dashboard} />
                                <Route exact path="/clientes" Component={Clientes} />
                                <Route exact path='/clientes/nuevo-cliente' Component={NuevoCLiente} />
                                <Route exact path='/clientes/editar/:_id' Component={EditarCliente} />
                                <Route exact path="/productos" Component={Productos} />
                                <Route exact path="/productos/nuevo-producto" Component={NuevoProducto} />
                                <Route exact path="/productos/editar-producto/:_id" Component={EditarProducto} />
                                <Route exact path="/pedidos/clientes" Component={PedidosTodos} />
                                <Route exact path="/pedidos/nuevo/:_id" Component={PedidoNuevo} />
                                <Route exact path="/pedidos/pdf/:_idPedido" Component={PedidoPDF} />
                                <Route exact path="/login" Component={Login} />
                            </Routes>
                        </main>
                    </div>

                </AUTHContext>
            </>
        </Router>
    );
}
export default App;
