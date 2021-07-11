import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Quotation2 = () => {

    const [clientes, setClientes] = useState([])
    const [fecha, setFecha] = useState([])
    const [productos, setProductos] = useState([])
    const [arrayProductos, setArrayProductos] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [client, setClient] = useState([])
    const history = useHistory();


    const getClientes = () => {
       axios.get(process.env.REACT_APP_SERVIDOR+'/api/clientes', {
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }})
        .then(e=>{
            setClientes(e.data.clientes)
            const date = new Date();
            const dia = date.getDate();
            const mes = date.getMonth()+1;
            const ano = date.getFullYear();

            setFecha(dia+'/'+mes+'/'+ano)
        })
        .catch(e=>console.log(e))
    } 
    
    
    const selectClienteHandler = (id, empresa)=>{
        document.getElementById('cliente').value = empresa
        setClient({ClienteId: id, empresa: empresa})
        
    }

    const getProductos = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/productos?offset=0&limit=100`, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }})
            .then(e=>setProductos(e.data.productos))
            .catch(e=>console.log(e))
    }

    const productoHandler = () => {
        const producto = document.getElementById('producto').value
        const precio = document.getElementById('precio').value
        const cantidad = document.getElementById('cantidad').value
        const subtotal2 = precio*cantidad

        const array1 = {"cantidad":cantidad,"producto":producto,"vUnitario":precio,"subtotal":subtotal2}
       
        setArrayProductos([...arrayProductos,array1])

    }

    const deleteHandler = (i) => {
        let filtered = arrayProductos.filter(function(value, index){
            return index !== i
        })
        setArrayProductos(filtered)
        calcularTotales();
    }

    const calcularTotales = () => {

        let suma = 0;
        
        for(let i = 0; i < arrayProductos.length; i++){
            suma += arrayProductos[i].subtotal;
        }

        
        let result = suma;

        document.getElementById('subtotal').value = result
        document.getElementById('iva').value = result*0.19
        document.getElementById('total').value = result+result*0.19
    }

    const envioHandler = () => {
        const subT = parseInt(document.getElementById('subtotal').value)
        const env = parseInt(document.getElementById('envio').value)
        const iva = parseInt(document.getElementById('iva').value)

        const resultado = subT + env + iva

        document.getElementById('total').value = resultado
       
    }

    const searchHandler = (e) => {
       
        const searchValue = e.target.value;

        axios.get(process.env.REACT_APP_SERVIDOR+`/api/clientes?offset=1&limit=10&search=${searchValue}`, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }})

       .then(e=>setClientes(e.data.clientes))
       .catch(e=>console.log(e))
    }

    const formHandler = () => {
        console.log('guardando...')
        const envio = document.getElementById('envio').value
        const vendidoPor = document.getElementById('vendidoPor').value
        const fecha = document.getElementById('fecha').value
        const tiempoEntrega = document.getElementById('tiempoEntrega').value
        const formaPago = document.getElementById('formaPago').value
        const observaciones = document.getElementById('observaciones').value
        const subtotal = document.getElementById('subtotal').value
        const iva = document.getElementById('iva').value
        const total = document.getElementById('total').value

        const cotizacion = { 
            vendedor:vendidoPor, 
            fecha: fecha, 
            fechaVencimiento: fecha,
            tiempo_entrega: tiempoEntrega,
            forma_pago: formaPago,
            observacionesCoti: observaciones,
            productos: JSON.stringify(arrayProductos),
            ClienteId: client.ClienteId,
            empresa: client.empresa,
            subtotal:subtotal,
            envio:envio,
            iva:iva,
            total:total
        }

        axios.post(process.env.REACT_APP_SERVIDOR+'/api/cotizaciones', cotizacion,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }})
            .then(e=>{
                alert('Guardado Correctamente')
                history.replace(`/cotizaciones/ver`)
            })
            .catch(e=>console.log(e))

        console.log(arrayProductos)
    }

    // console.log(arrayProductos)
    useEffect(() => {
        getClientes();
        getProductos();
        calcularTotales();
    }, [arrayProductos])

    return (
        <div className="container py-5">
            <h1 style={{color:"white"}}>Crear Cotizacion</h1>

            <section className="bg-white p-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group row row-cols-lg-auto">
                            <h3>Cliente:</h3>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Seleccionar cliente
                            </button>
                        </div>
                        <input type="text" name="cliente" id="cliente" className="form-control" readOnly/>
                        <div className="form-group my-4">
                            <h3>Vendido Por</h3>
                            <select name="vendidoPor" id="vendidoPor" className="form-control">
                                <option value="Medellin">Medellin</option>
                                <option value="Bogota">Bogota</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <h3>Fecha</h3>
                            <input type="text" name="fecha" id="fecha" className="form-control" defaultValue={fecha}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white px-5 pb-5 mb-5">
                <h3>Agregar Productos</h3>
                <div className="row">
                    <div className="col-md-5">
                        <select name="producto" id="producto" className="form-control">
                            {
                                
                                !productos? <option>Cargando</option> :
                                productos.map((i,index)=><option key={index}>{i.subCategoria.nombre + ' - ' +i.color}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="text" name="cantidad" id="cantidad" className="form-control" placeholder="Cantidad" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" name="precio" id="precio" className="form-control" placeholder="Precio" />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success" onClick={productoHandler}>+</button>
                    </div>
                </div>
            </section>
            <section className="bg-white my-5 p-5">
                <h3>Resumen Pedido</h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !arrayProductos ? 
                            <tr>
                                <td colSpan="4">Primero Agrega Productos</td>
                            </tr> :
                            arrayProductos.map((i,index)=>
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{i.producto}</td>
                                <td>{i.cantidad}</td>
                                <td>{i.vUnitario}</td>
                                <td>{i.subtotal}</td>
                                <td><button className="btn btn-danger" onClick={()=>deleteHandler(index)}>X</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            </section>
            <section className="bg-white p-5">
                <div className="row">
                    <div className="col-lg-6 col-md-8">
                        <h3>Condiciones</h3>
                        <div className="row">
                            <div className="col-sm-8 col-lg-6 text-end">
                                <p className="mt-4">Tiempo de Entrega:</p>
                                <p className="mt-5">Forma de Pago:</p>
                                <p className="mt-4">Observaciones:</p>
                            </div>
                            <div className="col-md-6">
                                <select name="tiempoEntrega" id="tiempoEntrega" className="form-control">
                                    <option value="">- Seleccione -</option>
                                    <option value="3 - 5 Dias">3 - 5 Dias</option>
                                    <option value="5 - 7 Dias">5 - 7 Dias</option>
                                    <option value="10 - 12 Dias">10 - 12 Dias</option>
                                    <option value="a Convenir">A Convenir</option>
                                </select>
                                <select name="formaPago" id="formaPago" className="form-control">
                                    <option value="">- Seleccione -</option>
                                    <option value="100% Anticipado">100% Anticipado</option>
                                    <option value="50% Anticipado - 50% Contra entrega">50% Anticipado - 50% Contra entrega</option>
                                    <option value="15 dias">15 Días</option>
                                    <option value="30 dias">30 Días</option>
                                    <option value="a Convenir">A Convenir</option>
                                </select>
                                <textarea name="observaciones" id="observaciones" cols="30" rows="7" className="form-control" defaultValue="Para Cheques y/o consignaciones elaborar a nombre de ALLCANYOUBUY SAS con Nit 900.694.948 -9 y consignar en BANCOLOMBIA AHORROS 05219729539"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        <div className="col-lg-5 col-md-8 float-end">
                            <table className="table float-end">
                                <tbody>
                                    <tr>
                                        <td>Subtotal:</td>
                                        <td><input type="text" name="subtotal" id="subtotal" defaultValue={subtotal} readOnly className="form-control"/></td>
                                    </tr>
                                    <tr>
                                        <td>Envio:</td>
                                        <td><input type="text" name="envio" id="envio" className="form-control" onChange={envioHandler} defaultValue="0"/></td>
                                    </tr>
                                    <tr>
                                        <td>Iva:</td>
                                        <td><input type="text" name="iva" id="iva" defaultValue={subtotal*0.19} readOnly className="form-control"/></td>
                                    </tr>
                                    <tr>
                                        <td>Total:</td>
                                        <td><input type="text" name="total" id="total" defaultValue={total} readOnly className="form-control"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={formHandler}>Guardar</button>
            </section>


            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Selecciona el Cliente</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input type="text" name="" id="" className="form-control" placeholder="Ingrese Nombre para Buscar" onChange={searchHandler}/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Empresa</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                             !clientes ? <h1>Cargando</h1> :
                             clientes.map((i)=>
                             <tr key={i.id}>
                                 <td>{i.id}</td>
                                 <td>{i.empresa}</td>
                                 <td>{i.celular}</td>
                                 <td><i className="far fa-hand-point-left" onClick={()=>selectClienteHandler(i.id, i.empresa)} data-bs-dismiss="modal"></i></td>
                             </tr>
                         )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Quotation2
