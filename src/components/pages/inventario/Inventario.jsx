import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Inventario = () => {
    const URL = process.env.REACT_APP_SERVIDOR;
    const history = useHistory();
    const cookies = new Cookies();

    const [productos, setProductos] = useState([])
    const [form, setForm] = useState([])
    const [inventario, setInventario] = useState([])

    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const formHandler = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${URL}/api/inventario`,form,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>console.log(e)).catch(e=>console.log(e))
        alert('Guardado Correctamente')
        setForm([])
        e.target.reset()
    }

    const getProductos = () => {
        axios.get(`${URL}/api/productos?offset=0&limit=100`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setProductos(e.data.productos))
        .catch(e=>console.log(e))
    }
    
    const getInventario = () => {

        axios.get(`${URL}/api/inventario`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setInventario(e.data.inventarios)).catch(e=>console.log(e))
    }

    useEffect(() => {
      getProductos();
      getInventario();
    }, [])


    return (
        <div>
            <div className="container py-5">
                <h1 className="text-white">Inventario</h1>
                <div className="row">
                    <div className="col-md-6">
                        <form action="" onSubmit={submitHandler}>
                            <label htmlFor='Producto' className="text-white">Producto</label>
                            <select name="ProductoId" id="ProductoId" className="form-control" onChange={formHandler}>
                                <option value="">- Seleccione -</option>
                                {
                                    productos.map(i=>
                                        <option value={i.id}>{i.subCategoria.nombre} - {i.color}</option>
                                        )
                                }
                            </select>
                            <div className='form-group'>
                               <label htmlFor='creditos' className="text-white">creditos</label>
                               <input className='form-control' type='text' name='creditos' id='creditos' onChange={formHandler}/>
                            </div>
                            <div className='form-group'>
                               <label htmlFor='debitos' className="text-white">debitos</label>
                               <input className='form-control' type='text' name='debitos' id='debitos' onChange={formHandler}/>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Guardar</button>
                        </form>
                    </div>
                </div>
                <section>
                    <div className="table-responsive mt-5 mb-5">
                    <table className="table table-dark">
                        <thead>
                            <tr className="text-center">
                                <th>Imagen</th>
                                <th>Color</th>
                                <th>Créditos</th>
                                <th>Débitos</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                inventario.map(i=>
                                    <tr>
                                        <td><img src={'/img/productos/'+i.Producto.imagen} alt="" width="150px"/></td>
                                        <td>{i.Producto.color}</td>
                                        <td>{i.totalCreditos}</td>
                                        <td>{i.totalDebitos}</td>
                                        <td>{i.totalCreditos - i.totalDebitos < 0 ? <span className="text-danger">{i.totalCreditos - i.totalDebitos} </span> : <span className="text-success">{i.totalCreditos - i.totalDebitos} </span>}</td>
                                    </tr>
                                    )
                         }

                        </tbody>
                    </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Inventario
