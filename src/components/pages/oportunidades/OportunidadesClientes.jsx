import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OportunidadesClientes = () => {


    const [clientes, setClientes] = useState([])
    const [page, setPage] = useState(0)
    const [segmento, setSegmento] = useState()
    const [clienteFiltered, setClienteFiltered] = useState([])
    const [form, setForm] = useState([])

    const getClientes = () => {
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/ordered?segmento=${segmento}&limit=10&offset=${page}`, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setClientes(e.data)).catch(e=>console.log(e))
    }

    const selectHandler = (e) => {
        setSegmento(e.target.value)
    }
    
    const editHandler = (id) => {
        console.log(id)
        const clienteFiltered = clientes.filter(i=>
            i.id = id
            )
            setClienteFiltered(clienteFiltered[0])
    }

    const formHandler = (e) => {
        e.preventDefault()
        console.log(form)
        

        axios.put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${clienteFiltered.id}`, form, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>console.log(e))

    }

    const inputHandler = (e) => {
        setForm({...form,[e.target.name]:e.target.value, id:1})
    }

    
    useEffect(() => {
        getClientes();
    }, [page,segmento])
    return (
        <>
            <div className="text-white py-5" style={{paddingLeft:"10%", paddingRight:'10%', paddingBottom:'10%'}}>
                <h1>Clientes</h1>
                <a href="/oportunidades/crear"><button className="btn btn-warning">Crear Oportunidad</button></a>
                <a href="/oportunidades"><button className="btn btn-success ms-4">Ver Oportunidad</button></a>
                <select name="segmento" id="segmento" className="form-control mb-4" onChange={selectHandler}>
                    <option> - Seleccione Filtro -</option>
                    <option value="hoteles">Hoteles y Piscinas</option>
                    <option value="parques">Parques</option>
                    <option value="Bares">Bares</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Distribuidor">Distribuidor</option>
                    <option value="Revendedor">Revendedor</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Otro">Otro</option>
                </select>
                <div className="table-responsive">
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Celular</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.length>0 ?
                                clientes.map(cliente=>
                                    <tr key={cliente.id}>
                                        <td>{cliente.empresa}</td>
                                        <td>{cliente.celular}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.correo}</td>
                                        <td><i className="fas fa-pen text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>editHandler(cliente.id)}></i></td>
                                    </tr>
                                    )
                                    : <tr>
                                        <td colSpan="4">No hay Información...</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                    {
                        page>0 ? 
                        <button className="btn btn-primary" onClick={()=>setPage(page-10)}>Anterior</button>
                        : ''
                    }
                    <button className="btn btn-primary ms-4" onClick={()=>setPage(page+10)}>Siguiente</button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Cliente</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <form action="" onSubmit={formHandler}>
                    <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" name="empresa" id="empresa" placeholder="Nombre de la Empresa" className="form-control mt-4" defaultValue={clienteFiltered.empresa} onChange={inputHandler}/>
                                    <input type="text" name="contacto" id="contacto" placeholder="Contacto" className="form-control mt-4" defaultValue={clienteFiltered.contacto} onChange={inputHandler}  />
                                    <input type="text" name="direccion" id="direccion" placeholder="Direccion" className="form-control mt-4" defaultValue={clienteFiltered.direccion} onChange={inputHandler} />
                                    <input type="text" name="departamento" id="departamento" placeholder="departamento" className="form-control mt-4" defaultValue={clienteFiltered.departamento} onChange={inputHandler} />
                                    <div className="row">
                                        <div className="col">
                                            <p className="mt-4 text-right">Celular</p>
                                        </div>
                                        <div className="col-10">
                                            <input type="text" name="celular" id="celular" placeholder="Celular" className="form-control mt-4" defaultValue={clienteFiltered.celular} onChange={inputHandler} />
                                        </div>
                                    </div>
                                    <select name="medioContacto" id="medioContacto" className="sele mt-4" onChange={inputHandler}>
                                        <option value="Seleccione">{clienteFiltered.medioContacto}</option>
                                        <option value="Referido">Referido</option>
                                        <option value="Google">Google</option>
                                        <option value="Telefono">Telefono</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Pagina Web">Página Web</option>
                                        <option value="Pagina Web">Cliente Antiguo </option>
                                        <option value="Pagina Web">Otro</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" name="nit" id="nit" placeholder="Nit" className="form-control mt-4" defaultValue={clienteFiltered.nit} onChange={inputHandler} />
                                    <input type="text" name="telefono" id="telefono" placeholder="Telefono" className="form-control mt-4" defaultValue={clienteFiltered.telefono} onChange={inputHandler} />
                                    <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad" className="form-control mt-4" defaultValue={clienteFiltered.ciudad} onChange={inputHandler}  />
                                    <input type="text" name="correo" id="correo" placeholder="Correo" className="form-control mt-4" defaultValue={clienteFiltered.correo} onChange={inputHandler} />
                                    <select name="genero" id="genero" className="sele mt-4" onChange={inputHandler}>
                                        <option>{clienteFiltered.genero}</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                    <div className="row">
                                        <div className="col mt-4 text-right">
                                            Es Cliente:
                                        </div>
                                        <div className="col-8">
                                            <select name="esCliente" id="esCliente" className="sele mt-3" onChange={inputHandler}>
                                                <option>{clienteFiltered.esCliente}</option>
                                                <option value="si">Si</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        
                            <select name="segmento" id="segmento" className="sele mt-4" onChange={inputHandler} >
                                <option>{clienteFiltered.segmento}</option>
                                <option value="hoteles">Hoteles y Piscinas</option>
                                <option value="parques">Parques</option>
                                <option value="Bares">Bares</option>
                                <option value="Hospital">Hospitales</option>
                                <option value="Eventos">Eventos</option>
                                <option value="Distribuidor">Distribuidor</option>
                                <option value="Revendedor">Revendedor</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Otro">Otro</option>
                            </select>
                       
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OportunidadesClientes
