import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Store } from '../../../store/store';
import Cookies from 'universal-cookie';

const Products = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    

    const [productos, setProductos] = useState()
    const [formData, setFormData] = useState({
        nombre:'',
        categoria:'',
        imagen:'',
        descripcion:''
    })
    const [currentPage, setCurrentPage] = useState(0)

    const getProductos = ()=>{
        const url = `${process.env.REACT_APP_SERVIDOR}/api/productos?limit=5&offset=${currentPage}`
        axios.get(url,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setProductos(e.data.productos))
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        getProductos()
    }, [currentPage])

    const addProductHandler = (e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/productos/post',formData)
        .then(e=>console.log(e))
        .catch(e=>console.log(e))
        alert('GUARDADO')   
    }

    const handlerChangeInput = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    
    return (
        <div className="container py-5">
            <h1 style={{color:'white'}}>Productos</h1>
           
            <table className="table table-dark mt-4 table-hover">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>IdProducto</th>
                        <th>Nombre</th>
                        <th>Color</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                   {productos ? productos.map((i,index)=>
                        <tr key={index}>
                            <td style={{width:'150px'}}><img className="img-fluid"  src={`/img/productos/${i.imagen}`} alt=""/></td>
                            <td>{i.id}</td>
                            <td>{i.subCategoria.nombre}</td>
                            <td>{i.color}</td>
                            <td><i className="fas fa-pen"></i></td>
                            <td><i className="fas fa-trash"></i></td>
                        </tr>
                    )
                    : <tr>
                        <td>Cargando...</td>
                      </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <button className="btn btn-primary float-end " onClick={()=>{setCurrentPage(currentPage+5)}}>Siguiente</button>
                            <h4 className="float-end me-3 ms-3">{currentPage+1} al {currentPage+5}</h4>
                            <button className="btn btn-primary float-end" onClick={()=>{setCurrentPage(currentPage-5)}}>Anterior</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
           
        </div>
    )
}

export default Products
