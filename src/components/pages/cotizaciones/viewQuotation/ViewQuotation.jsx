import React, {useEffect,useState} from 'react'
import axios from 'axios';

const ViewQuotation = () => {

    const [cotizaciones, setCotizaciones] = useState([]);

    const url = "http://127.0.0.1:8000/api/cotizaciones"
    const consulta = axios.get(url)
   
     
    useEffect(() => {
       consulta.then((rta)=>{
        setCotizaciones(rta.data)   
       })
    }, [])
   
    const cotizacion = cotizaciones[0];
    const productos = JSON.parse(cotizacion.productos)
    console.log(productos['44'].attributes.color)
    
    return (
        <div className="container">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>No de Cotizacion</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cotizaciones.map((i)=>
                      <tr key={i.id}>
                          <td>{i.id}</td>
                          <td>{i.fecha}</td>
                          <td>{i.id_cliente}</td>
                          <td>{i.productos}</td>
                          <td>{i.total}</td>
                      </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ViewQuotation
