import React, {useContext, useEffect,useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ViewQuotation = () => {

    const { REACT_APP_SERVIDOR } = process.env;
    const [data, setData] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [clientesCount, setClientesCount] = useState(0);
    const [page, setPage] = useState(0);
    const [quantiyOfResults, setQuantiyOfResults] = useState(20)
   
    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }


    function getProductsFromDB (){
            axios.get(REACT_APP_SERVIDOR+'/api/cotizaciones',{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                }
            })
            .then((data)=>{
                setData(data.data.cotizaciones);
                setClientesCount(data.data.cotizaciones.length)
                setCotizaciones(data.data.cotizaciones)
            })       
            .catch(e=>console.log(e))       
    }
     

    useEffect(() => {
       getProductsFromDB();
    }, [])

    

  
    
    function borrar(i){
        console.log(`${REACT_APP_SERVIDOR}/api/cotizaciones/${i}`)
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
        .then(e=>console.log(e.data.msg) )
        .catch(e=>console.log(e))
    }

    function searchInput (e){
        const searchValue = e.target.value

        const resultado = cotizaciones.filter((data) => {
            return data.empresa.includes(searchValue);
        });
        searchValue === '' ? setCotizaciones(data) :  setCotizaciones(resultado)
    }

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
    let paginated = cotizaciones.slice(startRow,newPage)
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


    return (
        <div className="container py-5">
            <h1>VER COTIZACIONES</h1>
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
                            {
                            paginated.map((i,index)=>
                            <tr key={index}>
                                   <td>{ i.id }</td>
                                   <td>{ i.Cliente.empresa }</td>
                                   <td>{ i.Cliente.telefono }</td>
                                   <td>{ i.Cliente.celular }</td>
                                   <td>{ i.Cliente.correo }</td>
                                   <td><a href={`/cotizaciones/pdf/${i.id}`}> <i className="fas fa-search"></i></a></td>
                                   <td><i className="fas fa-trash" onClick={()=>{borrar(i.id)}}></i></td>
                           </tr>
                         )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="" colSpan="6">
                                <div className="d-inline countTableAction"> Mostrando  registros</div>
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

export default ViewQuotation
