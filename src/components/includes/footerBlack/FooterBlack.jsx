import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'

const FooterBlack = () => {

    const date = new Date()
    const fecha = date.getDate()+'/'+date.getMonth() +'/'+ date.getFullYear() 

    return (
        <div className="footer pb-5">
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-3 d-flex align-items-center justify-content-center">
                    <Link to="/inicio"><i className="fas fa-home ms-3"></i></Link>
                    <Link to="/mail"><i className="fas fa-envelope ms-3"></i></Link>
                    <Link to="/inicio"><i className="fas fa-bell ms-3"></i></Link>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-5 col-5 d-flex align-items-center">
                    <p className="p-0 m-0">Usuario: Alejandro Cabrejo </p>
                </div>
                
                <div className="col col-md-4 col-sm-0 col-0"></div>
                <div className="col-md-1 col-sm-2 col-2 d-flex flex-row align-items-center">
                    <p className="p-0 m-0">{fecha}</p>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-2 col-1 d-flex flex-row align-items-center">
                   <Link to="/logut"> <i className="fas fa-power-off ms-3" style={{color:'red'}}></i></Link>
                </div>
            </div>
        </div>
    )
}

export default FooterBlack
