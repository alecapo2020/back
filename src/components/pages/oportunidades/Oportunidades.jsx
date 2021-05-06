import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Oportunidades = () => {
  
    const [oportunidades, setOportunidades] = useState([])
    const [opp, setOpp] = useState({
        id:''
    })
    
    const history = useHistory();
    const params = useParams();
    
    
    const getOportunidades = () => {
        axios.get('http://localhost:3001/api/oportunidades',{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setOportunidades(e.data.oportunidades)).catch(e=>console.log(e))
    }

    const verOportunidad = (id) => {
        
        axios.get(`http://localhost:3001/api/oportunidades/${id}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>{
            setOpp(e.data[0])
        })
        .catch(e=>console.log(e))
    }
    

    useEffect(() => {
        getOportunidades()
    }, [])

    return (
        <div>
            <div className="col-8 mx-auto p-5">
                <a href="/oportunidades/crear"><button className="btn btn-primary mb-4">Crear Oportunidad</button></a>
                <div className="table-responsive">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>Vendedor</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Etapa</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                oportunidades.map(i=>
                                    <tr key={i.id}>
                                        <td>{i.vendedor}</td>
                                        <td>{i.fechaCierre}</td>
                                        <td>{i.Cliente.empresa}</td>
                                        <td>{i.etapa}</td>
                                        <td>
                                        <i className="fas fa-binoculars" onClick={()=>verOportunidad(i.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                        </td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-control">
                                    <label htmlFor="id">Empresa</label>
                                    <input type="text" name="ClienteId" id="ClienteId" defaultValue={opp.ClienteId}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="id">etapa</label>
                                    <input type="text" name="etapa" id="etapa" defaultValue={opp.etapa}/>
                                </div>
                              
                                <div className="form-control">
                                    <label htmlFor="id">comentarios</label>
                                    <input type="text" name="comentarios" id="comentarios" defaultValue={opp.comentarios}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="id">razonPerdida</label>
                                    <input type="text" name="razonPerdida" id="razonPerdida" defaultValue={opp.razonPerdida}/>
                                </div>
                                
                            </div>
                            <div className="col-md-6">
                                <div className="form-control">
                                    <label htmlFor="id">fechaCierre</label>
                                    <input type="text" name="fechaCierre" id="fechaCierre" defaultValue={opp.fechaCierre}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="id">importe</label>
                                    <input type="text" name="importe" id="importe" defaultValue={opp.importe}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="id">pasoSiguiente</label>
                                    <input type="text" name="pasoSiguiente" id="pasoSiguiente" defaultValue={opp.pasoSiguiente}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="id">origenCandidato</label>
                                    <input type="text" name="origenCandidato" id="origenCandidato" defaultValue={opp.origenCandidato}/>
                                </div>
                            </div>
                        </div>
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

export default Oportunidades
