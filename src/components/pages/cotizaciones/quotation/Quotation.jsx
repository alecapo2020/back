import React,{useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Quotation = () => {
    const date = new Date().toLocaleDateString();
    const [cotizacion, setCotizacion] = useState({
        noCotizacion:'',
        ClienteId:'',
        fecha:date,
        fechaVencimiento:date,
        vendedor: '',
        productos: '',
        tiempo_entrega:'',
        forma_pago:'',
        observacionesCoti:'',
        subtotal:'',
        envio:'',
        iva:'',
        total:'',
    })
   
    const [cotiCount, setCotiCount] = useState(0)
    const [cliente, setCliente] = useState([])
    const [productos, setProductos] = useState([])
    const [prod, setProd] = useState([]) // Guarda momentaneamente valores de producto
    const [subtotalf, setSubtotalf] = useState(0)

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

   

  const guardarPost = (data)=>{
    
    console.log(cotizacion)
    const url = `${process.env.REACT_APP_SERVIDOR}/api/cotizaciones`;
    axios.post(url, cotizacion,{
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }
    })
    .then(e=>console.log(e))
    .catch(e=>console.log(e))
  }

  const cotiHandler = (e)=>{
        const envio = document.getElementById('envio').value 
        const iva = document.getElementById('iva').value 
        const total = document.getElementById('total').value 
        const observaciones = document.getElementById('observacionesCoti').value
        setCotizacion({...cotizacion, [e.target.name]:e.target.value,productos:JSON.stringify(prod),observacionesCoti:observaciones, subtotal:subtotalf, iva:iva,total:total,envio:envio})
    }

  const getCotizaciones = async () => {
    const url = `${process.env.REACT_APP_SERVIDOR}/api/cotizaciones?limit=10&offset=0`;
    
    await axios.get(url,{
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }
    })
    .then((e)=>{
        setCotiCount(e.data.count+1)
        setCotizacion({...cotizacion, noCotizacion:e.data.count+1})
    }).catch(e=>console.log(e))

    await axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/?limit=10&offset=0`,{
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }
    }).then(e=>setCliente(e.data.clientes)).catch(e=>console.log(e))

    await axios.get(`${process.env.REACT_APP_SERVIDOR}/api/productos?limit=100&offset=0`,{
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }
    }).then(e=>setProductos(e.data.productos)).catch(e=>console.log(e))
    }

    const searchHandler = (e) => {
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/?limit=10&offset=0&search=${e.target.value}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setCliente(e.data.clientes)).catch(e=>console.log(e))
    }

    const selectHandler = (id, empresa) => {
        document.getElementById('empresa').value = empresa
        setCotizacion({...cotizacion, empresa:empresa, ClienteId:id}) 
    }

    const prodHandler = (e) => {
        const subtotal = document.getElementById('cantidad').value * e.target.value
        document.getElementById('subtotal').value = subtotal
    }

    const addHandler = () => {
        const cantidad = document.getElementById('cantidad').value
        const producto = document.getElementById('producto').value
        const vUnitario = document.getElementById('vUnitario').value
        const subtotalt = document.getElementById('subtotal').value
        
        setProd([...prod,{cantidad:cantidad, producto:producto, vUnitario:vUnitario, subtotal:subtotalt}])
        setSubtotalf(parseInt(subtotalt)+parseInt(subtotalf))
    }
    console.log(cotizacion)

//   console.log(cotizacion)

  useEffect(() => {    
        getCotizaciones();
       
  }, [])
  
    return (
        <>
        <div className="container py-5 quotation">
                <section>
                    <div className="row">
                        <div className="col-md-6">
                            <h1>CREAR UNA COTIZACIÓN</h1>
                        </div>
                        <div className="col-md-6">
                            <button className="saveButton float-end me-5" onClick={guardarPost}><i className="fa fa-save"></i>Guardar</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-md-6 clientData">
                            
                            <h4>Empresa:</h4>
                            
                            <input type="text" name="empresa" id="empresa"/>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Buscar</button>
                            
                            <h4 className="mt-3">Nombre del Vendedor:</h4>
                            <select name="vendedor" id="vendedor" className="" onChange={cotiHandler}>
                                <option>Seleccione</option>
                                <option value="Medellin">Medellin</option>
                                <option value="Bogota">Bogota</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col-md-8">
                                    <table className="dateTable">
                                        <tbody className="text-end">
                                            <tr>
                                                <td>No. Cotizacion:</td>
                                                <td><input type="text" className="dateInput" id="noCotizacion" name="noCotizacion" value={cotiCount} readOnly/></td>
                                            </tr>
                                            <tr>
                                                <td>Fecha:</td>
                                                <td><input type="text" defaultValue={date} className="dateInput" id="fecha" name="fecha"/></td>
                                            </tr>
                                        
                                            <tr>
                                                <td>Fecha Vencimiento:</td>
                                                <td><input type="text" defaultValue={date} className="dateInput" id="fechaVencimiento" name="fechaVencimiento"/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                  <table className="table bg-white">
                      <thead>
                          <tr>
                              <th>Cantidad</th>
                              <th>Producto</th>
                              <th>Precio</th>
                              <th>Subtotal</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><input type="text" name="cantidad" id="cantidad" className="form-control"/></td>
                              <td>
                                  <select name="producto" id="producto" onChange={prodHandler}>
                                      <option>- Seleccione -</option>
                                      {
                                          productos.map((i)=>
                                            <option value={i.subCategoria.nombre+ ' - ' + i.color}>{i.subCategoria.nombre+ ' - ' + i.color}</option>
                                          )
                                      }
                                  </select>
                              </td>
                              <td><input type="text" name="vUnitario" id="vUnitario" className="form-control" onChange={prodHandler}/></td>
                              <td><input type="text" name="subtotal" id="subtotal" className="form-control" onChange={prodHandler}/></td>
                              
                              <td><i className="fas fa-plus text-dark" onClick={addHandler} ></i></td>
                          </tr>
                      </tbody>
                  </table>
                </section>
                <section className="py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="clientData">
                                <h3 className="mb-3">Condiciones</h3>
                                <div className="row">
                                    <div className="col-md-6 text-end">
                                        <p className="mb-4">Tiempo de Entrega:</p>
                                        <p className="mb-4">Forma de Pago:</p>
                                        <p className="mb-4">Observaciones:</p>
                                    </div>
                                    <div className="col-md-6">
                                        <select name="tiempo_entrega" id="tiempo_entrega" onChange={cotiHandler}>
                                            <option>- Seleccione -</option>
                                            <option defaultValue="1-3 dias">1 a 3 dias habiles</option>
                                        </select>
                                        <select name="forma_pago" id="forma_pago" onChange={cotiHandler}>
                                            <option>- Seleccione -</option>
                                            <option defaultValue="100% Anticipado">100% Anticipado</option>
                                        </select>
                                        
                                        <textarea name="observacionesCoti" id="observacionesCoti" cols="10" rows="5" className="form-control" defaultValue="Para Cheques y/o consignaciones elaborar a nombre de ALLCANYOUBUY SAS con Nit 900.694.948 -9 y consignar en BANCOLOMBIA AHORROS 05219729539" onChange={cotiHandler}></textarea>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="totales">
                                <div className="row">
                                    <div className="col-md-6 text-end">
                                        <p>Subtotal:</p>
                                        <p>Envio:</p>
                                        <p>Iva:</p>
                                        <p>Total:</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><input type="text" name="subtotalF" id="subtotalF" value={subtotalf}/></p>
                                        <p><input type="text" name="envio" id="envio" defaultValue="0"/></p>
                                        <p><input type="text" name="iva" id="iva" value={subtotalf * 0.19}/></p>
                                        <p><input type="text" name="total" id="total" value={subtotalf+subtotalf * 0.19}/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Selecciona Cliente</h5>
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
                                    cliente.map(i=>
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
        </>
    )
}



export default Quotation;
