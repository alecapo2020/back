import React,{useState, useEffect, useContext} from 'react'
import ClientField from './ClientField'
import ProductField from './ProductField'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Quotation = () => {
    const date = new Date().toLocaleDateString();
   
    const [totalInputs, setTotalInputs] = useState(0)
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
    const [cliente, setCliente] = useState([])
    const [status, setStatus] = useState(false);
    const [cotiCount, setCotiCount] = useState(0)
    const [subtotalProductos, setSubtotalProductos] = useState(0)

    const [products, setProducts] = useState([])
    const [totals, setTotals] = useState({
        subtotal:0,
        iva:0,
        envio:0,
        total:0
    })
    const [productList, setProductList] = useState([])
    

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }
    

  const calcEnvio =()=>{
    const subtotal = subtotalProductos;
    // iva
    const selectorIva = document.getElementById('iva')
    const iva = subtotal * 0.19
    selectorIva.value = iva
    
    // total
    const selectorTotal = document.getElementById('Total')
    const total = subtotal + iva
    selectorTotal.value = total
    
    setCotizacion({...cotizacion,iva:iva,total:total,subtotal:subtotal, productos:products})
  }

  const guardarPost = (data)=>{
      cotizacion.productos = JSON.stringify(cotizacion.productos)
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
        setCotizacion({...cotizacion, [e.target.name]:e.target.value,ClienteId:cliente})
    }

  function getNoCoti(){
    const url = `${process.env.REACT_APP_SERVIDOR}/api/cotizaciones`;
    
    axios.get(url,{
        headers:{
            token:'JaRvIs92!',
            correo:'alecapo@gmail.com',
            password:'123456'
        }
    })
    .then((data)=>{
        setCotizacion({...cotizacion, noCotizacion:data.data.cotizaciones.length+1})
    })
    
    .catch(e=>console.log(e))
    }




  useEffect(() => {    
        getNoCoti();
       
  }, [])

 
console.log(cotizacion)
// console.log(totals)
    
    return (
        <>
        {
            status===false ? 
        

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
                            <h3>Datos del Cliente</h3>
                            <h4>Empresa:</h4>
                            <ClientField cliente={setCliente}/>
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
                                                <td><input type="text" className="dateInput" id="noCotizacion" name="noCotizacion" value={cotizacion.noCotizacion} readOnly/></td>
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
                    <ProductField subtotal={setSubtotalProductos} products={setProducts} totals={setTotals} />
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
                                        <p><input type="text" name="" id="subtotalF" value={subtotalProductos}/></p>
                                        <p><input type="text" name="envio" id="envio" defaultValue="0" onBlur={calcEnvio}/></p>
                                        <p><input type="text" name="iva" id="iva" defaultValue="0"/></p>
                                        <p><input type="text" name="total" id="Total" defaultValue="0"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
          </div>
        
        :
        <div className="container py-5">
        <h3>Guardado Correctamente</h3>
        <button className="btn btn-success">Ver Cotizaciones</button>
        </div>
        }
        </>
    )
}



export default Quotation;
