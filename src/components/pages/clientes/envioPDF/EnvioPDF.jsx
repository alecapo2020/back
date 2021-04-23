import React, { useContext, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios';
import './style.css'
import { Store } from '../../../../store/store';

const EnvioPDF = () => {

  const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }

  const [cliente, setCliente] = useState([])
  const urlParam = useParams()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current ,
  });

  const getClients = () => {
    
    const url = `${process.env.REACT_APP_SERVIDOR}/api/clientes`;  
    axios.get(url,{
      headers:{
        token:'JaRvIs92!',
        correo:'alecapo@gmail.com',
        password:'123456'
    }
    })
      .then(e=>{
        const busqueda = e.data.clientes.filter(i=>i.id === parseInt(urlParam.idCliente))
        setCliente(busqueda)
        handlePrint()
        setTimeout(()=> window.location.replace('/clientes/ver'),2500)
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
                        cliente.map((i,index)=>
                            <div key={index}>
                                {i.empresa ?   <span>{i.empresa} <br/></span> : <span></span>}
                                {i.contacto ?   <span>{i.contacto} <br/></span> : <span></span>}
                                {i.telefono ?   <span>{i.telefono} <br/></span> : <span></span>}
                                {i.direccion ?   <span>{i.direccion} <br/></span> : <span></span>}
                                {i.ciudad ?   <span>{i.ciudad} <br/></span>  : <span></span>}
                            </div>
                            )
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
