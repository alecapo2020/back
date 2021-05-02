import axios from 'axios';
import React,{ useEffect,useState} from 'react';
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'universal-cookie';

const Clients = () => {
    const history = useHistory();
    const url = process.env.REACT_APP_SERVIDOR
    
    const [clientes, setClientes] = useState([]);
    const [offset, setOffset] = useState(0)
   
    
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    function getClientes (){
        axios.get(`${url}/api/clientes?limit=10&offset=0`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then((data)=>{
            setClientes(data.data.clientes);
        })       
        .catch(e=>console.log(e))       
    }

    const searchHandler = (e) => { 
        axios.get(`${url}/api/clientes?limit=10&offset=1&search=${e.target.value}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setClientes(e.data.clientes)).catch(e=>console.log(e))
    }
    
    const deleteHandler = (id) => {
        axios.delete(`${url}/api/clientes/${id}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then((e)=>{
            alert('Eliminado Correctamente')
            console.log(e)
        })
        getClientes();
    }
    
    useEffect(() => {
       getClientes();
    }, [offset])


    return (
        <div className="container py-5">
            <h1 className="text-white">VER CLIENTES</h1>
            <div className="bgSearchSection p-3 d-flex justify-content-center">
                <input className="searchInput" type="text" name="searchInput" id="searchInput" placeholder="Ingresa valor a buscar.." onChange={searchHandler}/>
            </div>

            <div className="tableBg">
                <table className="tabla" id="tabla">
                    <thead>
                      
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE DEL CLIENTE</th>
                            <th>TELÉFONO</th>
                            <th>CELULAR</th>
                            <th>CORREO</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {clientes.map((i,index)=>
                               <tr key={index}>
                                      <td>{ i.id }</td>
                                      <td>{ i.empresa }</td>
                                      <td>{ i.telefono }</td>
                                      <td>{ i.celular }</td>
                                      <td>{ i.correo }</td>
                                      <td><a href={`/clientes/envioPDF/${i.id}`}><i className="far fa-file-pdf" style={{color:"#218838",fontSize:'20px',padding:'7px'}}></i></a></td>
                                      <td><i className="fas fa-trash" onClick={()=>{deleteHandler(i.id)}} style={{color:"#E53129",fontSize:'20px',padding:'7px',cursor:'pointer'}}></i></td>
                                      <td><Link to={`/clientes/editar/${i.id}`}><i className="fas fa-pen" style={{color:"#F5C244",fontSize:'20px',padding:'7px',cursor:'pointer'}}></i></Link></td>
                              
                              
                              </tr>
                                
                            
                            
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="" colSpan="6">
                                
                                <div className="tableActions float-end">
                                    <button className="btn btn-primary" onClick={()=>{setOffset(offset-10)}}>Anterior</button>                                   
                                    <button className="btn btn-primary" onClick={()=>{setOffset(offset+10)}}>Siguiente</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Clients
