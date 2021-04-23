import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { Store } from '../../../../store/store'


const Editar = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const [cliente, setCliente] = useState([])
    const url = useParams()

    const getCliente = () => {
        const db = 'http://127.0.0.1:8000/api/clientes' 
        axios.get(db)
        .then(e=>setCliente(e.data.filter((i)=>i.idCliente === parseInt(url.idCliente))))
        .catch(e=>console.log(e))
    }

    const formHandler = (e) =>{
        // e.preventDefault()
        console.log(e)
    }

    useEffect(() => {
        getCliente();
    }, [])


    
    return (
        <div className="container text-white py-5">
           <h1>EDITAR CLIENTES</h1>
           <div className="row">
               <div className="col-md-6">
               <form action={'http://127.0.0.1:8000/api/clientes/editar/'+url.idCliente} method="post">
                    {
                        cliente !== [] 
                        ?
                        cliente.map((i,index)=>
                        <div key={index}>
                            <input type="text" name="imagen" id="imagen" placeholder="imagen" className="form-control" defaultValue={i.imagen}/>
                            <input type="text" name="empresa" id="empresa" placeholder="Empresa" className="form-control" defaultValue={i.empresa}/>
                            <input type="text" name="nit" id="nit" placeholder="nit" className="form-control" defaultValue={i.nit}/>
                            <input type="text" name="dv" id="dv" placeholder="dv" className="form-control" defaultValue={i.dv}/>
                            <input type="text" name="telefono" id="telefono" placeholder="telefono" className="form-control" defaultValue={i.telefono}/>
                            <input type="text" name="ciudad" id="ciudad" placeholder="ciudad" className="form-control" defaultValue={i.ciudad}/>
                            <input type="text" name="direccion" id="direccion" placeholder="direccion" className="form-control" defaultValue={i.direccion}/>
                            <input type="text" name="contacto" id="contacto" placeholder="contacto" className="form-control" defaultValue={i.contacto}/>
                            <input type="text" name="cargo" id="cargo" placeholder="cargo" className="form-control" defaultValue={i.cargo}/>
                            <input type="text" name="celular" id="celular" placeholder="celular" className="form-control" defaultValue={i.celular}/>
                            <input type="text" name="correo" id="correo" placeholder="correo" className="form-control" defaultValue={i.correo}/>
                            <input type="text" name="correoFactura" id="correoFactura" placeholder="correoFactura" className="form-control" defaultValue={i.correoFactura}/>
                            <input type="text" name="regimen" id="regimen" placeholder="regimen" className="form-control" defaultValue={i.regimen}/>
                            <input type="text" name="responsabilidad" id="responsabilidad" placeholder="responsabilidad" className="form-control" defaultValue={i.responsabilidad}/>
                            <input type="text" name="datosEnvio" id="datosEnvio" placeholder="datosEnvio" className="form-control" defaultValue={i.datosEnvio}/>
                            <input type="text" name="nombreEnvio" id="nombreEnvio" placeholder="nombreEnvio" className="form-control" defaultValue={i.nombreEnvio}/>
                            <input type="text" name="ciudadEnvio" id="ciudadEnvio" placeholder="ciudadEnvio" className="form-control" defaultValue={i.ciudadEnvio}/>
                            <input type="text" name="TelefonoEnvio" id="TelefonoEnvio" placeholder="TelefonoEnvio" className="form-control" defaultValue={i.TelefonoEnvio}/>
                            <input type="text" name="direccionEnvio" id="direccionEnvio" placeholder="direccionEnvio" className="form-control" defaultValue={i.direccionEnvio}/>
                            <input type="text" name="segmento" id="segmento" placeholder="segmento" className="form-control" defaultValue={i.segmento}/>
                            <input type="text" name="esCliente" id="esCliente" placeholder="esCliente" className="form-control" defaultValue={i.esCliente}/>
                        </div>
                        )
                        : <h1>cargando</h1>
                    }
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
               </div>
           </div>
        </div>
    )
}

export default Editar
