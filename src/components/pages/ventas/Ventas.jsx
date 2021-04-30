import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Ventas = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    
   
    const [productos, setProductos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)


    const getData = ()=>{
        const url = 'http://127.0.0.1:8000/api/prueba?page='+currentPage;
        axios.get(url)
        .then(e=>{ 
            // console.log(e.data)
            setProductos(e.data.data)
            })
        .catch(e=>console.log(e))
    }


   useEffect(() => {
       getData();
   }, [currentPage])
   
    return (
        <div className="container py-5 text-white">
           <table className="table bg-white">
               <tbody>
                   {
                       productos.map(i=>
                        <tr key={i.idProducto}>
                            <td>{ i.nombre } - {i.color}</td>
                        </tr>
                        )
                   }
               </tbody>
               <button>Resta</button>
               <button onClick={()=>{setCurrentPage(currentPage+1)}}>Suma</button>
           </table>
        </div>
    )
}

export default Ventas
