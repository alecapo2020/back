import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios';
import './style.css'
import Cookies from 'universal-cookie';

const EnvioPDF = () => {
  const {idCliente} = useParams();
  const history = useHistory();
  const cookies = new Cookies();
  const componentRef = useRef();

  if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
    console.log('error de autenticacion')
    history.replace('/login')
  }
   
  const [cliente, setCliente] = useState([])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ,
  });
  
  const getClients = () => {
    console.log(idCliente)
    const url = `${process.env.REACT_APP_SERVIDOR}/api/clientes/${idCliente}`;  
    axios.get(url,{
      headers:{
        token:'JaRvIs92!',
        correo:'alecapo@gmail.com',
        password:'123456'
    }
    })
      .then(e=>{ 
        setCliente(e.data)
        handlePrint()
        history.replace('/clientes/ver')
    })
    .catch(e=>console.log(e))
}

useEffect(() => {
      getClients();
    }, [])
    
  return (
      
    <div>
      <div ref={componentRef}>

      <div className="contenido" style={{padding:"40px"}}>
            <div className="primer">
                <div className="comapnyInfo">
                    <span style={{fontSize: "1.5rem", fontWeight: "700"}}> REMITE:</span> <br/>
                    <span style={{fontSize: "1rem", fontWeight: "300"}}>
                    <span style={{fontWeight: "700"}}> ALLCANYOUBUY S.A.S </span> <br/>
                    Nit: 900.694.948 - 9 <br/>
                    (313) 292 5094 <br/>
                    Cll 27Sur no 27b 34 Torre 2 Int 1606 <br/>
                    Envigado, Antioquia <br/>
                    www.manillasdecontrol.com</span>
                </div>
                <div className="logo" style={{position: "fixed", top:"20px",right: "20px"}}>
                    <figure>
                        <img src="/img/logo/logo.svg" width="300px" alt="Logo"/>
                    </figure>
                </div>	
            </div>
            <div className="segundo" style={{marginTop: "50px"}}>
                <div className="clientInfo" style={{textAlign: "center", fontSize: "1.3rem"}}>
                    <span style={{fontSize: "1.7rem", fontWeight: "700"}}> DESTINATARIO: </span><br/>
                    {
                          <div>
                              <span>{cliente.empresa} <br/></span>
                              {cliente.contacto ?   <span>{cliente.contacto} <br/></span> : <span></span>}
                              {cliente.telefono ?   <span>{cliente.telefono} <br/></span> : <span></span>}
                              {cliente.direccion ?   <span>{cliente.direccion} <br/></span> : <span></span>}
                              {cliente.ciudad ?   <span>{cliente.ciudad} <br/></span>  : <span></span>}
                          </div>
                           
                            
                    }
                </div>
            </div>
        </div>
        
          
      </div>

      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default EnvioPDF;
