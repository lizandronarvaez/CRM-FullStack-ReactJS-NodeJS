import React, { useContext, useEffect } from "react";
import Logout from "../../assets/logout.svg"
import { HOOKContext } from "../../hooks/authContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { Link } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(HOOKContext)
    const logout = () => {

        Swal.fire({
            title: 'Cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No, cancelar",
            confirmButtonText: 'Si, cerrar sesion'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    {
                        position: 'center',
                        icon: 'success',
                        title: 'Sesion cerrada correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                // cambiar auth a false y eliminar el token
                setAuth({
                    token: "",
                    authentication: false
                })
                // Removemos el token del local storage
                localStorage.removeItem("token");
                // Redireccionamos a iniciar sesion
                navigate("/");
            }
        })

    }
    useEffect(() => {

    }, [auth])

    return (
        <header className='barra'>
            <div className='contenedor'>
                <div className="contenido-barra">
                    <Link to={"/users"}><h1>Sistema de Gestion</h1></Link>
                    {auth.authentication !== true ?
                        null :
                        <button type="button"
                            className="btn btn-rojo"
                            onClick={logout}
                        >
                            <img src={Logout} alt="icon logout" />
                            Logout
                        </button>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
