import React, { useEffect,useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ViewQuotation = () => {

    const { REACT_APP_SERVIDOR } = process.env;
    const [cotizaciones, setCotizaciones] = useState([]);
    const [offset, setOffset] = useState(0)
    
    const history = useHistory();
    const cookies = new Cookies();
  
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    function getCotizaciones (){
        axios.get(REACT_APP_SERVIDOR+`/api/cotizaciones?limit=10&offset=${offset}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then((data)=>{
            setCotizaciones(data.data.cotizaciones)
        })       
        .catch(e=>console.log(e))       
    }
     
    function borrar(i){
        axios.delete(`${REACT_APP_SERVIDOR}/api/cotizaciones/${i}`, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            },
            data:{
                id:i
            }
        })
        .then(e=>{
            console.log(e.data.msg)
            getCotizaciones()   
        })
        .catch(e=>console.log(e))
    }

    const editar = (id) => {
        console.log(id)
        history.replace('/cotizaciones/editar/'+id)
    }

    function searchInput (e){
        const searchValue = e.target.value
        axios.get(REACT_APP_SERVIDOR+`/api/cotizaciones?limit=10&offset=0&search=${searchValue}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then((data)=>{
            setCotizaciones(data.data.cotizaciones)
        })       
        .catch(e=>console.log(e))       
        
    }

    useEffect(() => {
        getCotizaciones();
     }, [offset])

    return (
        <div className="container py-5">
            <h1 className="text-white">VER COTIZACIONES</h1>
            <div className="bgSearchSection p-3 d-flex justify-content-center">
                <input className="searchInput" type="text" name="searchInput" id="searchInput" placeholder="Ingresa valor a buscar.." onChange={(e)=>searchInput(e)}/>
                <button className="btnSearchField">Buscar</button>
            </div>

            <div className="tableBg table-responsive">
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
                            {
                            cotizaciones.map((i,index)=>
                            <tr key={index}>
                                   <td>{ i.id }</td>
                                   <td>{ i.Cliente.empresa }</td>
                                   <td>{ i.Cliente.telefono }</td>
                                   <td>{ i.Cliente.celular }</td>
                                   <td>{ i.Cliente.correo }</td>
                                   <td><i className="fas fa-pen" style={{color:'Gold', fontSize:'20px'}} onClick={()=>{editar(i.id)}}></i></td>
                                   <td><a href={`/cotizaciones/pdf/${i.id}`}> <i className="fas fa-search" style={{color:'green', fontSize:'20px'}}></i></a></td>
                                   <td><i className="fas fa-trash-alt" style={{color:'red', fontSize:'20px'}} onClick={()=>{borrar(i.id)}}></i></td>
                                   
                           </tr>
                         )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="" colSpan="6">
                                <div className="d-inline countTableAction"> Mostrando  registros</div>
                                 <div className="tableActions float-end">
                                    <button className="btn btn-primary" onClick={()=>{setOffset(offset-5)}}>Anterior</button>
                                    { offset } al { offset + 5 }
                                    <button className="btn btn-primary" onClick={()=>{setOffset(offset+5)}}>Siguiente</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
           
        </div>
    )
}

export default ViewQuotation
