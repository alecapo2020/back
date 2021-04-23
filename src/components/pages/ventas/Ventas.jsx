import { getDefaultNormalizer } from '@testing-library/dom'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Store } from '../../../store/store'


const Ventas = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
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
