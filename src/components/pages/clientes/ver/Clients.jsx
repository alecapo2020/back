import axios from 'axios';
import React,{useContext, useEffect,useState} from 'react';
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import { Store } from '../../../../store/store';

const Clients = () => {
    const { REACT_APP_SERVIDOR } = process.env;
    const [clientes, setClientes] = useState([]);
    const [clientesCount, setClientesCount] = useState(0);
    const [page, setPage] = useState(0);
    const [quantiyOfResults, setQuantiyOfResults] = useState(20)
   
    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    function getProductsFromDB (){
            axios.get(REACT_APP_SERVIDOR+'/api/clientes',{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                }
            })
            .then((data)=>{
                setClientes(data.data.clientes);
                setClientesCount(data.data.clientes.length)
            })       
            .catch(e=>console.log(e))       
    }
     
    
    useEffect(() => {
       getProductsFromDB();
    }, [])

    
    //paginationt
    function limit1 (){
        const selector = document.getElementById('limit').value;
        setQuantiyOfResults(selector)
    }
  
    // console.log(a)
    
    let currentPage = page;
    let startRow = 0;
    currentPage > 0 ? startRow = currentPage * quantiyOfResults : startRow = 0
    const newPage  = startRow + quantiyOfResults;
    let paginated = clientes.slice(startRow,newPage)
    // butons Pagination
    const contadorBotones = clientesCount / quantiyOfResults
    const items = [];

    for(let i = 0; i <= contadorBotones; i++){
        items.push(i)
    }
    let filtro = "";
    
    items>10
    ?
    filtro = items
    :
    filtro = items.slice(0,10)
    
    function borrar(i){
        const id = i
        const URL = `${REACT_APP_SERVIDOR}/api/clientes/${id}`
        axios.delete(URL, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }, {params: {
            idCliente: i
          }})
        .then(e=>alert(e.data) )
        .catch(e=>console.log(e))
    }

    function searchInput (e){
        const searchValue = e.target.value

       
        
        const resultado = clientes.filter((data) => {
            return data.empresa.includes(searchValue);
        });
        
        searchValue === '' ? setClientes(clientes) :  setClientes(resultado)


    }


    return (
        <div className="container py-5">
            <h1>VER CLIENTES</h1>
            <div className="bgSearchSection p-3 d-flex justify-content-center">
                <input className="searchInput" type="text" name="searchInput" id="searchInput" placeholder="Ingresa valor a buscar.." onChange={(e)=>searchInput(e)}/>
                <button className="btnSearchField">Buscar</button>
            </div>

            <div className="tableBg">
                <table className="tabla" id="tabla">
                    <thead>
                        <tr>
                            <td>
                                <div className="wrap">
                                Mostrar
                                <select name="limit" id="limit" onChange={()=>limit1()}>
                                    <option value="10" >10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                Entradas
                                </div>
                            </td>
                        </tr>
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
                            {paginated.map((i,index)=>
                               <tr key={index}>
                                      <td>{ i.id }</td>
                                      <td>{ i.empresa }</td>
                                      <td>{ i.telefono }</td>
                                      <td>{ i.celular }</td>
                                      <td>{ i.correo }</td>
                                      <td><a href={`/clientes/envioPDF/${i.id}`}><i className="far fa-file-pdf" style={{color:"#218838",fontSize:'20px',padding:'7px'}}></i></a></td>
                                      <td><i className="fas fa-trash" onClick={()=>{borrar(i.id)}} style={{color:"#E53129",fontSize:'20px',padding:'7px',cursor:'pointer'}}></i></td>
                                      <td><Link to={`/clientes/editar/${i.id}`}><i className="fas fa-pen" style={{color:"#F5C244",fontSize:'20px',padding:'7px',cursor:'pointer'}}></i></Link></td>
                              
                              
                              </tr>
                                
                            
                            
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="" colSpan="6">
                                <div className="d-inline countTableAction"> Mostrando {startRow} a {newPage} de {clientesCount} registros</div>
                                <div className="tableActions float-end">
                                    <button className="btn btn-primary" onClick={()=>{setPage(page-1)}}>Anterior</button>

                                    {filtro.map((i)=>
                                            <button className="buttonTableAction" onClick={()=>setPage(i)} key={i}>{i}</button>
                                    )}
                                   
                                    <button className="btn btn-primary" onClick={()=>{setPage(page+1)}}>Siguiente</button>
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
