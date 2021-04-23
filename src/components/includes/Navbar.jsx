import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
   
  
  const clientesUl = () => {
    const selectorUl = document.getElementById('clientesUl');
     
    if(selectorUl.innerHTML === ""){  
      selectorUl.innerHTML = `<li><a className="nav-link active" href="/clientes/ver">VER</a></li><li><a className="nav-link active" href="/clientes/crear">CREAR</a> </li>`;
    }else{
      selectorUl.innerHTML = ''
    }
}
  
  const cotizacionesUl = () => {
      const selectorUl = document.getElementById('cotizacionesUl');
        
      if(selectorUl.innerHTML === ""){  
        selectorUl.innerHTML = `<li><a className="nav-link active" href="/cotizaciones/ver">VER</a> </li><li><a className="nav-link active" href="/cotizaciones/crear">CREAR</a></li><li><a className="nav-link active" href="/">SOLICITUDES</a> </li>`;
      }else{
        selectorUl.innerHTML = ''
      }
  }

  const ordenesUl = () => {
      const selectorUl = document.getElementById('ordenesUl');
        
      if(selectorUl.innerHTML === ""){  
        selectorUl.innerHTML = `<li><a className="nav-link active" href="/">VER</a> </li><li><a className="nav-link active" href="/">CREAR</a></li>`;
      }else{
        selectorUl.innerHTML = ''
      }
  }
    


    
    
    return (
        <Fragment>
          <nav id="navMenu">
           <div className="menu">
              <img src="/img/logo/logo.svg" alt=""/>
            <div className="menu-nav">
                <ul>
                  <li><Link className="nav-link active" to="/">INICIO</Link> </li>
                  <li><Link className="nav-link active" onClick={()=>{clientesUl()}} to="#">CLIENTES <i className="fas fa-bars ms-5"></i> </Link> </li>  
                  <ul id="clientesUl"></ul>
                  
                  <li><Link className="nav-link active" onClick={()=>{cotizacionesUl()}} to="#">COTIZACIONES <i className="fas fa-bars ms-5"></i> </Link> </li>       
                  <ul id="cotizacionesUl"></ul>
                
                  <li><Link className="nav-link active" onClick={()=>{ordenesUl()}} to="#">ORDENES <i className="fas fa-bars ms-5"></i> </Link> </li>  
                  <ul id="ordenesUl"></ul>
                
                  <li><Link className="nav-link active" to="/">VENTAS ONLINE</Link> </li>

                  <li><Link className="nav-link active" to="/productos">PRODUCTOS</Link> </li>
                </ul>
                <div className="row justify-content-center">
                  <button className="btnCerrarSesion">CERRAR SESIÓN</button>
                </div>
              </div>
           </div>
          </nav>
        </Fragment>
    )
}

export default Navbar