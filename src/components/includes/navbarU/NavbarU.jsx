import React from 'react'
import './style.css'
import {
    Link
  } from "react-router-dom";

const NavbarU = () => {
    return (
        <>
        <div className="hamburguerMenu">
            <i className="fas fa-bars"></i>
        </div>
        <div className="nav" id="sideNav">
            <div className="logo mx-auto mt-3">
                <img src="/img/logo/logoCuadrado.svg" alt="" width="80%"/>
            </div>
            
            <div className="botones d-flex justify-content-center flex-column p-5">
                <Link to="/ordenes/crear">
                    <div className="botonLi mb-4" style={{background:"var(--amarilloFondo)"}}>
                        <div className="icono">
                            <i className="fas fa-user"></i>
                        </div>
                        <p>Ordenes</p>
                    </div>
                </Link>
                 <Link to="/cotizaciones/crear">
                    <div className="botonLi mb-4" style={{background:"var(--AzulFondo)"}}>
                        <div className="icono">
                            <i className="fas fa-user"></i>
                        </div>
                        <p>Cotizaciones</p>
                    </div>
                </Link>
                 {/* <Link to="/ventas/ver">
                    <div className="botonLi mb-4" style={{background:"var(--verdeFondo)"}}>
                        <div className="icono">
                            <i className="fas fa-user"></i>
                        </div>
                        <p>Ventas</p>
                    </div>
                </Link> */}
                 <Link to="/clientes/ver">
                    <div className="botonLi mb-4" style={{background:"var(--moradoFondo)"}}>
                        <div className="icono">
                            <i className="fas fa-user"></i>
                        </div>
                        <p>Clientes</p>
                    </div>
                </Link>
                 <Link to="/productos/ver">
                    <div className="botonLi mb-4" style={{background:"var(--fucsiaFondo)"}}>
                        <div className="icono">
                            <i className="fas fa-user"></i>
                        </div>
                        <p>Productos</p>
                    </div>
                </Link>
            </div>
        
        </div>
        </>
    )
}

export default NavbarU
