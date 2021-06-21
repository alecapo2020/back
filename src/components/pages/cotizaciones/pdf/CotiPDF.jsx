import React, { useRef, useEffect,useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  useHistory,
  useParams
} from "react-router-dom";
import './style.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { ComponentToPrint } from './ComponentToPrint';

const CotiPDF = () => {

  const url = process.env.REACT_APP_SERVIDOR
  const history = useHistory();
    
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    
  const {NoCoti} = useParams();  
  const [cotizacion, setCotizacion] = useState(0)

  const getCotizacion = ()=>{
     axios.get(`${url}/api/cotizaciones/${NoCoti}`, {
       headers:{
          token:'JaRvIs92!',
          correo:'alecapo@gmail.com',
          password:'123456'
       }
     })
     .then(e => {
      setCotizacion(e.data[0])
      // handlePrint();
      // history.replace('/cotizaciones/ver')
    })
  }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });


    useEffect(() => {
      getCotizacion();       
    }, [])

   
    return (
      <div className="bg-white">
        <div ref={componentRef} >
        {cotizacion===0?<p style={{marginLeft:'600px'}}>cargando</p>:
        
        <div className="fondo logoFondo">
        <section className="seccion1">
          <div className="fila">
            <div className="columna" style={{marginLeft:'70px',fontWeight:'300'}}>
              <p></p>
              <p>Cotización No. {cotizacion.id} </p>
            </div>
            <div className="columna logo">
                <img src="/img/logo/logo.svg" width="70%" alt="Logo"/>
            </div>
          </div>
        </section>
        
        <section className="seccion2">
        <p>{cotizacion.Cliente.empresa}</p>
        <p>{cotizacion.Cliente.contacto}</p>
        <p>{cotizacion.Cliente.telefono}</p>
        <p>{cotizacion.Cliente.correo}</p>
        </section>

        <section className="seccion3">
            <table className="table" style={{width:'80%',margin:'auto'}}>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>V. Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                
              {
                console.log((cotizacion.productos))
              }
              {/* {
                
                JSON.parse(cotizacion.productos).map((i,index)=>
                    <tr key={index}>
                      <td>{parseInt(i.cantidad).toLocaleString()}</td>
                      <td>{i.producto}</td>
                      <td>${parseInt(i.vUnitario)}</td>
                      <td>${parseInt(i.subtotal).toLocaleString()}</td>
                    </tr>
                  )
              } */}
                
                      
                
               

              </tbody>
            </table>  
        </section>       

        <section className="seccion4">
          <div className="fila">
            <div className="columna" style={{marginLeft:'70px'}}>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Tiempo de Entrega:</span><span style={{fontWeight:'300',color:'#707070'}}> {cotizacion.tiempo_entrega}</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Forma de Pago: </span><span style={{fontWeight:'300',color:'#707070'}}>{cotizacion.forma_pago}</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Observaciones Adicionales:</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'300',color:'#707070'}}> {cotizacion.observacionesCoti}</span></p>
            </div>
           
            <div className="columna info">
              <table className="precios">
                <tbody>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Subtotal:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${parseInt(cotizacion.subtotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Iva:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${parseInt(cotizacion.iva).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Envio:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${parseInt(cotizacion.envio).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Total:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${parseInt(cotizacion.total).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="seccion5">
          <p>
            <span style={{fontWeight:'bold'}}>ALLCANYOUBUY SAS</span> <br/>
            Celular: (313) 2925094 <br/>
            ventas@manillasdecontrol.com <br/>
            www.manillasdecontrol.com <br/>
          </p>
          <img src="/img/logo/a.svg" alt="" className="imgFooter"/>
        </section>

     </div>
        }
       
         
         
        </div>
        <div className="my-5 py-5">

        <button onClick={handlePrint}>Print this out!</button>
        </div>
     
      </div>
    );
    
}   

export default CotiPDF
