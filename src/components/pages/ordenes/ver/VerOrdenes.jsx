import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Store } from '../../../../store/store';

const VerOrdenes = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    
    const { REACT_APP_SERVIDOR } = process.env;
    const url = REACT_APP_SERVIDOR;
    const [ordenes, setOrdenes] = useState([])
    
    const getOrdenes = ()=>{
        axios.get(url+'/api/ordenes',{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>{
            console.log(e.data.orders)
            setOrdenes(e.data.orders)}
            )
        .catch(e=>console.log(e.data))
    }


    useEffect(() => {
        getOrdenes();
    }, [])

    return (
        <div className="container py-5">
            <table className="table bg-dark table-light table-striped">
                <thead>
                    <tr>
                        <th>No Orden</th>
                        <th>Fecha</th>
                        <th>Empresa</th>
                        <th>Productos</th>
                        
                        <th>Iva</th>
                        <th>Envio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordenes.length > 0 ?
                        ordenes.map((orden,index)=>
                            <tr key={index}>
                                <td>{orden.id}</td>
                                <td>{orden.fecha}</td>
                                <td>{orden.Cliente.empresa}</td>
                                <td>
                                    <div className="table-responsive">

                                    
                                        <table key={index} className="table">
                                            <thead>
                                                <tr>
                                                    <th>producto</th>
                                                    <th>cantidad</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                    {JSON.parse(orden.productos).map((i,index)=>
                                                <tr key={index}>
                                                    <td>{i.product}</td>
                                                    <td>{i.quantity}</td>
                                                    <td>{i.price}</td>
                                                </tr>
                                       )}
                                       </tbody>
                                   </table>
                                   </div>
                                    </td>
                                
                                <td>{orden.iva}</td>
                                <td>{orden.envio}</td>
                                <td>{orden.total}</td>
                            </tr>
                        )
                        : <tr><td><p>Cargando</p></td></tr>
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default VerOrdenes
