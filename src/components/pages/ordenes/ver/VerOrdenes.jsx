import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const VerOrdenes = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    const [data, setData] = useState([])
    const [productos, setProductos] = useState([])
    const [offset, setOffset] = useState(0)
    
    const url = process.env.REACT_APP_SERVIDOR;
    const getOrdenes = () => {
        axios.get(url+`/api/ordenes?limit=5&offset=${offset}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>{
            setProductos(e.data.productos)
            setData(e.data.ordenes)}
            )
        .catch(e=>console.log(e.data))
    }

    const searchHandler = (e) => {
        axios.get(`${url}/api/ordenes?limit=5&offset=1&search=${e.target.value}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>{setData(e.data.ordenes)}).catch(e=>console.log(e))
    }

    useEffect(() => {
        getOrdenes();
    }, [offset])

    return (
        <div className="container py-5">
            <div className="col-6 mx-auto mb-4">
                <input type="text" name="search" id="search" onChange={searchHandler} placeholder="Ingrese valor a buscar" className="form-control"/>
            </div>
            <div className="table-responsive">
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
                            data.map((orden,index)=>
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
                                                                    <td>{parseInt(i.quantity).toLocaleString()}</td>
                                                                    <td>{i.price}</td>
                                                                </tr>
                                                    )}
                                                </tbody>
                                        </table>
                                    </div>
                                    </td>
                                    <td>${parseInt(orden.iva).toLocaleString()}</td>
                                    <td>${parseInt(orden.envio).toLocaleString()}</td>
                                    <td>${parseInt(orden.total).toLocaleString()}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="row row-cols-auto float-end mb-5">
                <button className="btn btn-primary me-3" onClick={()=>{setOffset(offset-5)}}>Anterior</button>   
                    <h5 className="text-white">{offset}</h5>                            
                <button className="btn btn-primary ms-3" onClick={()=>{setOffset(offset+5)}}>Siguiente</button>
            </div>
        </div>
    )
}

export default VerOrdenes
