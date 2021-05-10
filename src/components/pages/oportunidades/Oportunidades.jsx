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
        axios.get('http://www.manillasapi.com/api/oportunidades',{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>setOportunidades(e.data.oportunidades)).catch(e=>console.log(e))
    }

    const verOportunidad = (id) => {
        
        axios.get(`http://www.manillasapi.com/api/oportunidades/${id}`,{
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
                        <h5 className="modal-title" id="exampleModalLabel">Oportunidad</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       <div>
                            <h3 className="my-4">Empresa: { opp.ClienteId } </h3>
                           <div className="row">
                               <div className="col-md-6">
                                   <p><strong>Etapa: </strong> { opp.etapa } </p>
                                   <p><strong>Paso Siguiente:</strong> { opp.pasoSiguiente }</p>
                                   <p><strong>Comentarios: </strong></p>
                                   <textarea className="form-control" name="" id="" cols="30" rows="5" defaultValue={ opp.comentarios }></textarea>
                               </div>
                               <div className="col-md-6">
                                   <p><strong>Fecha: </strong>{ opp.fechaCierre}</p>
                                   <p><strong>Importe: </strong>{ opp.importe}</p>
                                   <p><strong>Origen Candidato:</strong> { opp.origenCandidato }</p>
                                   <strong>Razon Perdida: </strong> { opp.razonPerdida === 'Vigente' ? <p style={{color:'white', background:'green', textAlign:'center', fontSize:'1.5rem'}}>{ opp.razonPerdida } </p> : <p style={{color:'white', background:'green', textAlign:'center', fontSize:'1.5rem'}}> { opp.razonPerdida } </p> }
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
