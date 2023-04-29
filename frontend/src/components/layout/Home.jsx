import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div className='contenedor-home'>
                <h2>Bienvenido, para acceder a la APP necesitas iniciar sesion</h2>
                <Link to={"/login"} className='boton btn-verde'>Ir a iniciar sesion</Link>
            </div>
        </>
    )
}

export default Home