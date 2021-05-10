import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const OportunidadesCrear = () => {

    const history = useHistory();
    const date = new Date ();
    const mes = date.getMonth() + 1
    console.log(date.getMonth())
    const today = date.getFullYear() + '/' + mes + '/' + date.getDate() 
    

    const [clientes, setClientes] = useState([])
    const [form, setForm] = useState([])
 
    const searchCliente = (e) => {
        axios.get(`http://www.manillasapi.com/api/clientes?search=${e.target.value}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setClientes(e.data.clientes))
    }

    const selectHandler = (id,empresa) => {
        console.log(id,empresa)
        document.getElementById('empresa').value = empresa
        setForm({...form, ClienteId:id, fechaCierre:today})
    }

    const formHandler = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('envio')

        axios.post(`http://www.manillasapi.com/api/oportunidades`,form,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>history.replace('/oportunidades'))
    }


    return (
        <div>
            <div className="mb-5">
                
                
                <div className="col-7 mx-auto bg-white  p-5 mb-5">
                <h1>Crear Oportunidad</h1>
                <a href="/oportunidades"><button className="btn btn-primary mb-4">Ver Oportunidades</button></a>
                <a href="/oportunidades/clientes"><button className="btn btn-success mb-4 ms-3">Ver Clientes</button></a>
                    <form action="" onSubmit={submitHandler} method="POST">
                        <div className="row">
                            <div className="col-md-6">
                                        <label htmlFor='Empresa'>Empresa</label>
                                <div className="row row-cols-auto">
                                    <div className='form-group'>
                                        <input className='form-control' type='text' name='empresa' id='empresa' readOnly/>
                                    </div>
                                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Buscar</button>
                                </div>
                               
                                <div className='form-group mt-3'>
                                   <label htmlFor='importe'>Cantidad de Manillas</label>
                                   <input className='form-control' type='text' name='importe' id='importe' onChange={formHandler}/>
                                </div>
                                
                                <div className='form-group mt-3'>
                                   <label htmlFor='comentarios'>Comentarios</label>
                                   <input className='form-control' type='text' name='comentarios' id='comentarios' onChange={formHandler}/>
                                </div>
                                <div className='form-group mt-3'>
                                    <label htmlFor='Etapa'>Etapa</label>
                                    <select name="etapa" id="etapa" className="form-control" onChange={formHandler}>
                                        <option>Seleccione</option>
                                        <option value="Contacto en Frio">Contacto en Frio</option>
                                        <option value="Analisis">Analisis</option>
                                        <option value="Propuesta">Propuesta</option>
                                        <option value="Negociacion">Negociacion</option>
                                        <option value="Cerrado Ganado">Cerrado Ganado</option>
                                        <option value="Cerrado Perdido">Cerrado Perdido</option>
                                    </select>
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="Vendedor">Vendedor</label>
                                    <select name="vendedor" id="vendedor" className="form-control" onChange={formHandler}>
                                        <option>Seleccione</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='form-group'>
                                   <label htmlFor='fechaCierre'>Fecha (dd/mm/aaaa)</label>
                                   <input className='form-control' type='text' name='fechaCierre' id='fechaCierre' defaultValue={today} onChange={formHandler}/>
                                </div>
                              
                                
                                <div className='form-group mt-3'>
                                   <label htmlFor='pasoSiguiente'>Paso Siguiente</label>
                                   <input className='form-control' type='text' name='pasoSiguiente' id='pasoSiguiente' onChange={formHandler}/>
                                </div>
                                <div className='form-group mt-3'>
                                   <label htmlFor='origenCandidato'>Origen Cliente</label>
                                   <select name="origenCandidato" id="origenCandidato" className="form-control" onChange={formHandler}>
                                       <option>Seleccione</option>
                                       <option value="Base de Datos Propia">Llamada Entrante</option>
                                       <option value="Base de Datos Propia">Base de Datos Propia</option>
                                       <option value="Google">Google</option>
                                       <option value="Referido">Referido</option>
                                       <option value="Otro">Otro</option>
                                   </select>
                                </div>
                                <div className='form-group mt-3'>
                                   <label htmlFor='razonPerdida'>Razon Perdida</label>
                                   <select name="razonPerdida" id="razonPerdida" className="form-control" onChange={formHandler}>
                                       <option>Seleccione</option>
                                       <option value="Precios">Precios</option>
                                       <option value="Tiempo">Tiempo</option>
                                       <option value="Vigente">Vigente</option>
                                       <option value="Perdido a la Competencia">Perdido a la Competencia</option>
                                       <option value="No Presupuesto">No Presupuesto</option>
                                       <option value="No Decision">No Decision</option>
                                       <option value="Otro">Otro</option>
                                   </select>
                                </div>
                            </div>
                           <button type="submit" className="btn btn-success mt-4">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Buscar Cliente</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="col-4">
                            <input type="text" className="form-control" name="" id="" placeholder="Ingresa Nombre para buscar" onChange={searchCliente}/>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Nit</th>
                                    <th>Telefono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clientes.map(i=>
                                        <tr>
                                            <td>{i.empresa}</td>
                                            <td>{i.nit}</td>
                                            <td>{i.telefono}</td>
                                            <td>
                                                <i class="far fa-hand-point-left" onClick={()=>{selectHandler(i.id, i.empresa)}} data-bs-dismiss="modal"></i>
                                            </td>
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

export default OportunidadesCrear
