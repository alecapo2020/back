import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Editar = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const [cliente, setCliente] = useState([])
    const url = useParams()

    const getCliente = async (id) => {
        
        const db = `http://www.manillasapi.com/api/clientes/${id.idCliente}`
       await axios.get(db,{headers:{
        token:'JaRvIs92!',
        correo:'alecapo@gmail.com',
        password:'123456'
        }})
        .then(e=>setCliente(e.data))
        .catch(e=>console.log(e))
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        const form = e.target
        const dat = {
            empresa:   form.elements['empresa'].value,
            nit:       form.elements['nit'].value,
            contacto:  form.elements['contacto'].value,
            celular:   form.elements['celular'].value,
            correo:    form.elements['correo'].value,
            telefono:  form.elements['telefono'].value,
            direccion: form.elements['direccion'].value,
            ciudad:    form.elements['ciudad'].value,
            segmento:  form.elements['segmento'].value,
            esCliente: form.elements['esCliente'].value,
        }
        const id = url.idCliente
        
        axios.put(`http://www.manillasapi.com/api/clientes/${id}`,dat,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>{
            alert(e.data.msg)
            history.replace('/clientes/ver')
        })
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        getCliente(url);
    }, [])


    
    return (
        <div className="container text-white py-5">
           <h1>EDITAR CLIENTES</h1>
               <form method="post" onSubmit={submitHandler}>
           <div className="row">
               <div className="col-md-6">
                   <div className="form-group">
                        <label htmlFor="">Empresa:</label>
                        <input type="text" name="empresa" id="empresa" placeholder="Empresa" className="form-control" defaultValue={cliente.empresa}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">Nit:</label>
                        <input type="text" name="nit" id="nit" placeholder="nit" className="form-control" defaultValue={cliente.nit}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">Direccion</label>
                        <input type="text" name="direccion" id="direccion" placeholder="direccion" className="form-control" defaultValue={cliente.direccion}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">Ciudad</label>
                        <input type="text" name="ciudad" id="ciudad" placeholder="ciudad" className="form-control" defaultValue={cliente.ciudad}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">Correo</label>
                        <input type="text" name="correo" id="correo" placeholder="correo" className="form-control" defaultValue={cliente.correo}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">Segmento</label>
                        <input type="text" name="segmento" id="segmento" placeholder="segmento" className="form-control" defaultValue={cliente.segmento}/>
                   </div>
                   <div className="form-group">
                        <label htmlFor="">EsCliente</label>
                        <input type="text" name="esCliente" id="esCliente" placeholder="esCliente" className="form-control" defaultValue={cliente.esCliente}/>
                   </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
               </div>
               <div className="col-md-6">
                   <div className="form-group">
                        <label htmlFor="">Contacto:</label>
                        <input type="text" name="contacto" id="contacto" placeholder="contacto" className="form-control" defaultValue={cliente.contacto}/>
                   </div>
                   <div className="form-group">
                    <label htmlFor="">Celular</label>
                    <input type="text" name="celular" id="celular" placeholder="celular" className="form-control" defaultValue={cliente.celular}/>
                   </div>
                   <div className="form-group">
                   <label htmlFor="">Telefono:</label>
                    <input type="text" name="telefono" id="telefono" placeholder="telefono" className="form-control" defaultValue={cliente.telefono}/>
                   </div>
               </div>
           </div>
                </form>
        </div>
    )
}

export default Editar
