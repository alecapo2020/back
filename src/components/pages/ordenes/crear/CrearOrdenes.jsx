import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';
const CrearOrdenes = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    

    const mes = parseInt(new Date().getMonth()) + 1;

    const [form, setForm] = useState({
        fecha:new Date().getFullYear()+'/'+mes+'/'+new Date().getDate(),
        ClienteId:'',
        vendidoPor:'',
        formaDePago:'',
        productos:'',
        subtotal:'0',
        iva:'',
        envio:'0',
        total:'',
    })


    const [products, setProducts] = useState()
    const [clientes, setClientes] = useState([])
    const [busqueda, setBusqueda] = useState([])

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const carHandler = () => {
        const producto = document.getElementById('producto').value
        const cantidad = document.getElementById('cantidad').value
        const precio = document.getElementById('precio').value
        const subtotl = parseInt(cantidad)*parseInt(precio)
        const total = {product:producto,quantity:cantidad,price:precio,subt:subtotl}
        const tot = parseInt(cantidad) * parseInt(precio)
        const suma = parseInt(form.subtotal)+parseInt(tot)
        const ivaV = suma*0.19
        const totalOrden = suma + ivaV
        setForm({...form,productos:[...form.productos,total],subtotal:suma,iva:ivaV,total:totalOrden})
    }

    const save = () => {

        const url = `${process.env.REACT_APP_SERVIDOR}/api/ordenes`
        form.productos = JSON.stringify(form.productos)
        axios.post(url,form,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
            })
        .then(e=>console.log(e))
        .catch(e=>console.log(e))
        
        setForm({
            fecha:'',
            ClienteId:'',
            vendidoPor:'',
            formaDePago:'',
            productos:'',
            subtotal:'0',
            iva:'',
            envio:'',
            total:'',
        })
        alert('enviando..')
    }

    const getProducts = () =>{
        const url = `${process.env.REACT_APP_SERVIDOR}/api/productos`
        axios.get(url,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            },
        })
        .then(e=>{
            setProducts(e.data.productos)
        })
        .catch(e=>console.log(e))
        
    }

    const getClientes = () => {
        const url = `${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=1`;
        axios.get(url,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setClientes(e.data.clientes))
        .catch(e=>console.log(e))
    }

    const searchHandler = (e) =>{
        const searchValue = (e.target.value)
        const url = `${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=1&search=${searchValue}`;
        axios.get(url,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setClientes(e.data.clientes))
        .catch(e=>console.log(e))
    }

    const selectHandler = (id,empresa) => {
        setForm({...form,ClienteId:id})
        document.getElementById('Empresa').value = empresa

    }

    const sinIvaHandler = () => {
        const subtotal = parseInt(document.getElementById('subtotal').value)
        const iva = 0
        const Piva = parseInt(document.getElementById('iva').value)
        const total = parseInt(document.getElementById('total').value) - Piva
        
        setForm({...form,subtotal:subtotal,iva:iva,total:total})
    }

    const envioHandler = (e) =>{
        const value = parseInt(e.target.value)
        const total = parseInt(document.getElementById('subtotal').value)
        const iva = parseInt(document.getElementById('iva').value)
        setForm({...form, envio:value, total:total+value+iva})
    }

    useEffect(() => {
        getProducts()
        getClientes()
    }, [])

    // console.log(form)

    return (
        <div className="container py-5">
            
            <div className="save">
                <i className="far fa-save d-flex align-items-center" onClick={save}></i>
            </div>
            <div className="boxx p-5">
                <div className="row">
                    <div className="col-3">
                        <h1>Crear Orden</h1>
                    </div>
                    <div className="col"></div>
                    <div className="col-5 align-items-center d-flex p-0 m-0">
                        <div className="row ">
                            <div className="col-2">
                                <p className="mt-3">Fecha</p>
                            </div>
                            <div className="col-10">
                                <input type="text" className="form-control" id="fecha" name="fecha" placeholder="dd/mm/aaaa" onChange={formHandler} defaultValue={form.fecha}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6">  
                        <div className="form-group">
                            <label htmlFor="Cliente">Cliente:</label>
                          <button className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Seleccion Cliente</button>
                            <input type="text" name="Empresa" id="Empresa" className="form-control" readOnly/>
                        </div>
                    </div>
                    <div className="col-md-6">
                       <div className="form-group">
                         <label htmlFor="vendidoPor">Vendido Por</label>
                         <select className="form-control" name="vendidoPor" id="vendidoPor" onChange={formHandler} defaultValue={form.producto}>
                           <option>Seleccione</option>
                           <option value="Bogota">Bogota</option>
                           <option value="Medellin">Medellin</option>
                         </select>
                       </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-5">
                        <div className="form-group">
                          <label htmlFor="producto">Productos</label>
                          <select className="form-control" name="producto" id="producto" onChange={formHandler} defaultValue={form.producto}>
                            {
                                products ?
                                products.map(i=>
                                    <option value={i.idProducto} key={i.idProducto}>{i.subCategoria.nombre} - {i.color}</option>
                                    )
                                    : <option>Cargando</option>
                            }
                           
                          </select>
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor=""></label>
                          <input type="text"
                            className="form-control" name="cantidad" id="cantidad" aria-describedby="helpId" placeholder="Cantidad"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor=""></label>
                          <input type="text"
                            className="form-control" name="precio" id="precio" aria-describedby="helpId" placeholder="Precio" defaultValue="110"/>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <img src="/img/iconos/add.svg" alt="icono" className="icon" onClick={carHandler}/>
                    </div>
                </div>
            </div>
            <div className="boxx mt-5 p-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           form.productos ?
                           form.productos.map((i,index)=>
                            <tr key={index}>
                                <td>{i.product}</td>
                                <td>${i.quantity.toLocaleString()}</td>
                                <td>${i.price.toLocaleString()}</td>
                                <td>${i.subt.toLocaleString()}</td>
                            </tr>
                            )
                            : <tr><td>Primero agrega productos</td></tr>
                       }
                    </tbody>
                </table>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <label htmlFor="formaDePago">Forma de Pago</label>
                        <div className="form-group">
                          <select className="form-control" name="formaDePago" id="formaDePago" onChange={formHandler} defaultValue={form.vendidoPor}>
                            <option>Seleccione</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Bancolombia Ale">Bancolombia Ale</option>
                            <option value="Bancolombia Bps">Bancolombia Bps</option>
                            <option value="Efectivo Pap">Efectivo Pap</option>
                            <option value="Davivienda">Davivienda</option>
                            <option value="PayU">PayU</option>
                          </select>
                        </div>
                        <button className="btn btn-primary" onClick={sinIvaHandler}>Sin Iva</button>
                    </div>
                    <div className="col-md-7"></div>
                    <div className="col-md-2">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    
                                    <td><input type="text" name="subtotal" id="subtotal" value={form.subtotal} className="form-control"/></td>
                                </tr>
                                <tr>
                                    <td>Iva</td>
                                    
                                    <td><input type="text" name="iva" id="iva" defaultValue={form.iva} className="form-control"/></td>
                                </tr>
                                <tr>
                                    <td>Envio</td>
                                    <td><input type="text" name="envio" id="envio" className="form-control" onChange={envioHandler} defaultValue={form.envio}/></td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td><input type="text" name="total" id="total" defaultValue={form.total} className="form-control"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Seleccionar Cliente</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="col-md-6 mx-auto">
                            <input type="text" name="search" id="search" placeholder="buscar" className="form-control" onChange={searchHandler}/>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Empresa</th>
                                    <th>Telefono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clientes.map(i=>
                                        <tr key={i.id}>
                                            <td>{i.id}</td>
                                            <td>{i.empresa}</td>
                                            <td>{i.telefono}</td>
                                            <td><i className="far fa-hand-point-left" data-bs-dismiss="modal" aria-label="Close" onClick={()=>selectHandler(i.id, i.empresa)}></i></td>
                                        </tr>    
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default CrearOrdenes
