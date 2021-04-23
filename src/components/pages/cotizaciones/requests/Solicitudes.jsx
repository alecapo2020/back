import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Solicitudes = () => {

    const url = 'http://127.0.0.1:8000/api/cotizaciones/solicitudes';

    const [solicitudes, setSolicitudes] = useState([])
    
    

    const getRequest = ()=>{
        axios.get(url)
        .then(e=>{ 
            setSolicitudes(e.data) 
        })
        .catch(e=>console.log(e))
    }



    useEffect(() => {
        getRequest();
    }, [])

    console.log(solicitudes)
  

    return (
        <div className="container py-5">
                <table className="table bg-white">
                    <thead>
                        <tr>
                            
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Productos</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                      {solicitudes.length <1 ? <tr><td>cargando</td></tr>
                     :  solicitudes.map((i,index)=>
                        <tr key={index}>
                            
                            <td>{i.fecha}</td>
                            <td>{i.empresa}</td>
                            <td>{i.telefono}</td>
                            <td>{i.correo}</td>
                            <td>
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Categoria</th>
                                            <th>Cantidad</th>
                                            <th>Impresion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{JSON.parse(i.productos).map((r,index)=>{
                                            if(r.idcategoria === '1'){
                                               return 'Tyvek'
                                            }else if(r.idcategoria ==='2'){
                                                return 'Plasticas' 
                                            }else if(r.idcategoria ==='3'){
                                                return 'Tejidas'
                                            }
                                            
                                            return 'nada'
                                            })}</td>
                                            <td>{JSON.parse(i.productos).map((r,index)=><p key={index}>{r.cantidad}</p>)}</td>
                                            <td>{JSON.parse(i.productos).map((r,index)=><p key={index}>{r.impresion}</p>)}</td>
                                        </tr>
                                    </tbody>
                                </table>   
                            </td>
                            
                            <td>{i.obs}</td>
                        </tr>
                  )
                      }
                    </tbody>
                </table>
        </div>
    )
}

export default Solicitudes
