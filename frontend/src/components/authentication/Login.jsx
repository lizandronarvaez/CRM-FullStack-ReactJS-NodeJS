import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2/dist/sweetalert2.all'
// hookContent
import { HOOKContext } from '../../hooks/authContext'

const Login = () => {
    const navigate = useNavigate()
    // useContext
    const [auth, setAuth] = useContext(HOOKContext);

    // useState
    const [credenciales, setCredenciales] = useState({})

    // guardar los datos del formulario en un state
    const datosFormulario = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value })
    }

    // Crear el submit para enviar los datos
    const enviarFormulario = async (e) => {
        e.preventDefault();

        try {
            const result = await clienteAxios.post("/users/iniciar-sesion", credenciales);
            // Extraer token y gurdarlo en el localStorage
            const { token } = result.data
            localStorage.setItem("token", token)
            setAuth({
                token,
                authentication: true
            })
            // Si el resultado es correcto no redirige al dasboard
            if (result.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Correcto',
                    text: "Accediendo a la aplicacion...",
                    showConfirmButton: false,
                    timer: 2000
                })
                navigate("/users")
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    text: "Hubo un error"
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error"
                })
            }

        }
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <div className='contenedor-formulario'>
                <form onSubmit={enviarFormulario}>
                    <div className='campo'>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            name="email"
                            onChange={datosFormulario}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                            name="password"
                            onChange={datosFormulario}
                        />
                    </div>
                    <input type="submit" value="Login" className='btn btn-verde' />
                </form>

            </div>
        </div>
    )
}

export default Login