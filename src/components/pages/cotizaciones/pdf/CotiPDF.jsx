import React, { useRef, useEffect,useState, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Redirect,
  useHistory,
  useParams
} from "react-router-dom";
import './style.css'
import axios from 'axios';
import { Store } from '../../../../store/store';
// import { ComponentToPrint } from './ComponentToPrint';


const CotiPDF = () => {

  const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    
  const {NoCoti} = useParams();  
  const [cotizacion, setCotizacion] = useState(0)

  
  const getCotizacion = ()=>{
     axios.get('http://127.0.0.1:8000/api/cotizaciones')
     .then(res=>{
       const busquedaCotizacion = (res.data.filter(i=>
        i.id === parseInt(NoCoti)
      ))
      setCotizacion(busquedaCotizacion)
      handlePrint();
      setTimeout(()=>
      window.location.href = "http://localhost:3000/cotizaciones/ver",3000
      )
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
              <p>Cotización No. {cotizacion[0].id} </p>
            </div>
            <div className="columna logo">
                <img src="/img/logo/logo.svg" width="70%" alt="Logo"/>
            </div>
          </div>
        </section>
        
        <section className="seccion2">
        <p>{cotizacion[0].empresa}</p>
        <p>{cotizacion[0].contacto}</p>
        <p>{cotizacion[0].telefono}</p>
        <p>{cotizacion[0].correo}</p>
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
                
                JSON.parse(cotizacion[0].productos).map((i,index)=>
                    <tr key={index}>
                      <td>{i.cantidad}</td>
                      <td>{i.producto}</td>
                      <td>${i.precio}</td>
                      <td>${i.subtotal.toLocaleString()}</td>
                    </tr>
                  )
              }
                
                      
                
               

              </tbody>
            </table>  
        </section>       

        <section className="seccion4">
          <div className="fila">
            <div className="columna" style={{marginLeft:'70px'}}>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Tiempo de Entrega:</span><span style={{fontWeight:'300',color:'#707070'}}> {cotizacion[0].tiempo_entrega}</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Forma de Pago: </span><span style={{fontWeight:'300',color:'#707070'}}>{cotizacion[0].forma_pago}</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'500',color:'#707070'}}>Observaciones Adicionales:</span></p>
              <p style={{margin:'5px'}}><span style={{fontWeight:'300',color:'#707070'}}> {cotizacion[0].observacionesCoti}</span></p>
            </div>
           
            <div className="columna info">
              <table className="precios">
                <tbody>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Subtotal:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${cotizacion[0].subtotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Iva:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${cotizacion[0].iva.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Envio:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${cotizacion[0].envio}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:'300',textAlign:'right',color:'#707070', paddingBottom:'10px'}}>Total:</td>
                    <td style={{fontWeight:'300',color:'#707070', paddingBottom:'10px'}}>${cotizacion[0].total.toLocaleString()}</td>
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
