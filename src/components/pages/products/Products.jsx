import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Store } from '../../../store/store';


const Products = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
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
    const [currentPage, setCurrentPage] = useState(1)

    const getProductos = ()=>{
        const url = `${process.env.REACT_APP_SERVIDOR}/api/productos`
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
            <button type="button" className="btn btn-success my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Agregar Producto
            </button>
            <table className="table table-dark">
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
                            <button className="btn btn-primary float-end " onClick={()=>{setCurrentPage(currentPage+1)}}>Siguiente</button>
                            <h4 className="float-end me-3 ms-3">{currentPage}</h4>
                            <button className="btn btn-primary float-end" onClick={()=>{setCurrentPage(currentPage-1)}}>Anterior</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="" onSubmit={(e)=>addProductHandler(e)}>
                    <div className="modal-body">
                        <div className="col-4">
                            <div className="form-group">
                              <label htmlFor="">Nombre:</label>
                              <input type="text"
                                className="form-control" name="nombre" value={formData.nombre} onChange={handlerChangeInput}/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Descripcion:</label>
                              <textarea name="descripcion" id="descripcion" cols="30" rows="5" className="form-control" value={formData.descripcion} onChange={handlerChangeInput}></textarea>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Color</label>
                              <input type="text"
                                className="form-control" name="color" id="color" aria-describedby="helpId" placeholder="" value={formData.color} onChange={handlerChangeInput}/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Categoria:</label>
                              <select className="form-control" name="categoria" id="categoria" value={formData.categoria} onChange={handlerChangeInput}>
                                <option>Selecciona Categoria</option>
                                <option value="1">Manillas Tyvek</option>
                                <option value="2">Manillas Plasticas</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Imagen</label>
                              <input type="file" className="form-control-file" name="" id="" placeholder="" aria-describedby="fileHelpId"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>     
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
