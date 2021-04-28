import React, { useContext } from 'react';
import './style.css';
import {Link, useHistory} from 'react-router-dom';
import { Store } from '../../../store/store'

const Inicio = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }
 
 

    return (
        <div className="container-fluid py-5 inicioPage">
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background: 'var(--amarilloFondo)'}}>
                    <h3 className="titulo"><i className="far fa-check-square me-2"></i> Ordenes</h3>
                    <div className="row">
                        <div className="col-6 justify-content-center d-flex">
                            <Link to="/ordenes/ver">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background: 'var(--amarilloFondo)'}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                        <div className="col-6 justify-content-center d-flex">
                            <Link to="/ordenes/crear">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background: 'var(--amarilloFondo)'}}>
                                        <i className="fas fa-pen"></i>
                                    </div>
                                    <h3 className="textoBoton">Crear</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background:"var(--AzulFondo)"}}>
                    <h3 className="titulo"><i className="fas fa-file-invoice me-2"></i> Cotizaciones</h3>
                    <div className="row">
                        <div className="col-4 justify-content-center d-flex">
                            <Link to="/cotizaciones/ver">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--AzulFondo)"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                        <div className="col-4 justify-content-center d-flex">
                            <Link to="/cotizaciones/crear">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--AzulFondo)"}}>
                                        <i className="fas fa-pen"></i>
                                    </div>
                                    <h3 className="textoBoton">Crear</h3>
                                </div>
                            </Link>    
                        </div>
                        <div className="col-4 justify-content-center d-flex">
                            <Link to="/cotizaciones/solicitudes">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--AzulFondo)"}}>
                                        <i className="fas fa-pen"></i>
                                    </div>
                                    <h3 className="textoBoton">Solicitudes</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background:"var(--moradoFondo)"}}>
                    <h3 className="titulo"><i className="far fa-check-square me-2"></i> Clientes</h3>
                    <div className="row" >
                        <div className="col-6 justify-content-center d-flex" >
                            <Link to="/clientes/ver">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--moradoFondo)"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                        <div className="col-6 justify-content-center d-flex">
                            <Link to="/clientes/crear">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--moradoFondo)"}}>
                                        <i className="fas fa-pen"></i>
                                    </div>
                                    <h3 className="textoBoton">Crear</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background:"var(--verdeFondo)"}}>
                    <h3 className="titulo"><i className="fas fa-file-invoice me-2"></i> Ventas</h3>
                    <div className="row">
                        <div className="col-12 justify-content-center d-flex">
                            <Link to="/ventas">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--verdeFondo)"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background:"var(--rojoFondo)"}}>
                    <h3 className="titulo"><i className="fas fa-file-invoice me-2"></i> Informes</h3>
                    <div className="row">
                        <div className="col-12 justify-content-center d-flex">
                            <Link to="/infomes">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--rojoFondo)"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-10 col-12">
                <div className="caja" style={{background:"var(--fucsiaFondo)"}}>
                    <h3 className="titulo"><i className="far fa-check-square me-2"></i> Productos</h3>
                    <div className="row">
                        <div className="col-6 justify-content-center d-flex">
                            <Link to="/productos/ver">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--fucsiaFondo)"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="textoBoton">Ver</h3>
                                </div>
                            </Link>    
                        </div>
                        <div className="col-6 justify-content-center d-flex">
                            <Link to="/productos/crear">
                                <div className="boton">
                                    <div className="iconoBox d-flex justify-content-center align-content-center" style={{background:"var(--fucsiaFondo)"}}>
                                        <i className="fas fa-pen"></i>
                                    </div>
                                    <h3 className="textoBoton">Crear</h3>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4"></div>
        </div>
    </div>
    )
}

export default Inicio
