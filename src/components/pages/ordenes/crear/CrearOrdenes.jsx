import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Store } from '../../../../store/store'

const CrearOrdenes = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const mes = parseInt(new Date().getMonth()) + 1;

    const [form, setForm] = useState({
        fecha:new Date().getDate()+'/'+mes+'/'+new Date().getFullYear(),
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
        console.log(form.subtotal)
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
            console.log(e.data.productos)
            setProducts(e.data.productos)
        })
        .catch(e=>console.log(e))
        
    }

    const getClientes = () => {
        const url = `${process.env.REACT_APP_SERVIDOR}/api/clientes`;
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

    const clienteHandler = (e) =>{
        const searchValue = (e.target.value)
        
        const busquedaA = clientes.filter((i)=>
            i.empresa === searchValue
            )

        busquedaA.length > 0 ? 
        setBusqueda(busquedaA)
        : console.log('no data')
        console.log(busquedaA)
        
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
        console.log(total)
        setForm({...form, envio:value, total:total+value+iva})
    }

    useEffect(() => {
        getProducts()
        getClientes()
    }, [])

    console.log(form)

    return (
        <div className="container py-5">
            <div className="clienteTabla">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        busqueda !== [] 
                        ?
                        busqueda.map((i,index)=>
                            <tr key={index} onClick={()=>setForm({...form,ClienteId:i.id})}>
                                <td>{i.id}</td>
                                <td>{i.empresa}</td>
                            </tr>
                           
                        )
                        :
                        <tr>
                            <td>Buscando</td>
                        </tr>
                        }
                       
                    </tbody>
                </table>
            </div>
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
                          <label htmlFor="">Nombre del Cliente</label>
                          <input type="text"
                            className="form-control" name="ClienteId" id="ClienteId" aria-describedby="helpId" placeholder="" onChange={clienteHandler}/>
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
                          <select className="form-control" name="producto" id="producto" onChange={formHandler} value={form.producto}>
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
        </div>
    )
}

export default CrearOrdenes
