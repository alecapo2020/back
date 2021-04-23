import React,{useContext, useState} from 'react'
import './style.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Store } from '../../../../store/store';


const CreateClient = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const urlApi = "http://127.0.0.1:8000/api/clientes";

    const [formData, setFormData] = useState({
        imagen:'/a.webp',
        empresa:'',
        nit:'',
        dv:'',
        telefono:'',
        ciudad:'',
        direccion:'',
        contacto:'',
        cargo:'',
        celular:'',
        correo:'',
        correoFactura:'',
        regimen:'',
        responsabilidad:'',
        datosEnvio:'',
        nombreEnvio:'',
        ciudadEnvio:'',
        telefonoEnvio:'',
        direccionEnvio:'',
        segmento:'',
        esCliente:'',
    })
   

    const handleChangeInput = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handlerForm =(e)=>{
        e.preventDefault();
        pushClient(formData);
    }

    const pushClient = (formData)=>{
        axios.post(urlApi+'/post', { formData })
      .then(res => {
        alert('guardado',res);
        console.log(res.data);
      })
      .catch((e)=>console.log('el error'+e))
    }




    return (
        <form action="" id="form" onSubmit={(e)=>{handlerForm(e)}} >
        <div className="container mb-5">
            
            <h1>Crear Cliente</h1>
            <button type="submit" className="btn btn-success float-end">GUARDAR</button>
            
            <div className="row my-5">
                <div className="col-md-6 d-flex justify-content-center flex-column">
                    <img src="https://via.placeholder.com/200" className="mx-auto imagen" alt="Profile Pictur"/>
                    <button className="mx-auto btn bg-light">Agregar Imagen</button>
                </div>
                <div className="col-md-6">
                    <h3>Datos de la empresa</h3>
                    <div className="box">
                        <input type="text" name="empresa" id="empresa" placeholder="Nombre de la Empresa" className="form-control" value={formData.empresa} onChange={handleChangeInput} />
                        <div className="row">
                            <div className="col-10 pe-0">
                                <input type="text" name="nit" id="nit" placeholder="Nit" className="form-control" value={formData.nit} onChange={handleChangeInput}/>
                            </div>
                            <div className="col-2 ps-0">
                                <input type="text" name="dv" id="digitoVerificacion" placeholder="DV" className="form-control" value={formData.dv} onChange={handleChangeInput}/>
                            </div>
                        </div>
                        <input type="text" name="telefono" id="telefono" placeholder="Telefono" className="form-control" value={formData.telefono} onChange={handleChangeInput}/>
                        <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad" className="form-control" value={formData.ciudad} onChange={handleChangeInput}/>
                        <input type="text" name="direccion" id="direccion" placeholder="Direccion" className="form-control" value={formData.direccion} onChange={handleChangeInput}/>
                        <select name="segmento" id="segmento" className="sele"   onChange={handleChangeInput}>
                            <option>Segmento</option>
                            <option value="hoteles">Hoteles y Piscinas</option>
                            <option value="parques">Parques</option>
                            <option value="parques">Bares</option>
                            <option value="parques">Hospitales</option>
                            <option value="parques">Eventos</option>
                            <option value="parques">Distribuidor</option>
                            <option value="parques">Revendedor</option>
                            <option value="parques">Empresa</option>
                            <option value="parques">Otro</option>
                        </select>
                        <select name="esCliente" id="esCliente" className="sele"   onChange={handleChangeInput}>
                            <option>Es Cliente?</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-6">
                    <h3>Datos de Contacto</h3>
                    <div className="box">
                        <div className="inputs">
                            <input type="text" name="contacto" id="contacto" placeholder="Contacto" className="form-control" value={formData.contacto} onChange={handleChangeInput}/>
                            <input type="text" name="cargo" id="cargo" placeholder="Cargo" className="form-control" value={formData.cargo} onChange={handleChangeInput}/>
                            <input type="text" name="celular" id="celular" placeholder="Celular" className="form-control" value={formData.celular} onChange={handleChangeInput}/>
                            <input type="text" name="correo" id="correo" placeholder="Correo" className="form-control" value={formData.correo} onChange={handleChangeInput}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Datos para Facturación</h3>
                    <div className="box">
                        <input type="text" name="correoFactura" id="correoFactura" placeholder="Correo Electronico" className="form-control" value={formData.correoFactura} onChange={handleChangeInput}/>
                        <select name="regimen" id="regimen" className="form-control sele" onChange={handleChangeInput}>
                            <option>Tipo de Regimen IVA</option>
                            <option value="No Responsable de IVA">No Responsable de IVA</option>
                            <option value="Responsable de IVA">Responsable de IVA</option>
                        </select>
                        <div className="py-4">
                            <h5>Tipo de Responsabilidad</h5>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="responsabilidad" id="responsabilidad" value='o-13' onChange={handleChangeInput} />
                                o-13 Gran Contribuyente
                            </label>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="responsabilidad" id="responsabilidad" value='o-15' onChange={handleChangeInput} />
                                o-15 Autoretenedor 
                            </label>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="responsabilidad" id="responsabilidad" value='o-23' onChange={handleChangeInput} />
                                o-23 Agente de retencion IVA 
                            </label>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="responsabilidad" id="responsabilidad" value='o-47' onChange={handleChangeInput} />
                                o-47 Regimen Simple de tributacion 
                            </label>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="responsabilidad" id="responsabilidad" value='no' onChange={handleChangeInput} />
                                No responsable
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-12">
                    <h3>Datos de Envio</h3>
                    <div className="row col-4">
                        <div className="col-8">
                        <p>Son los mismos de la empresa?</p>
                        </div>
                        <div className="col-4">
                            <select name="datosEnvio" id="datosEnvio" className="sele"   onChange={handleChangeInput}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                <div className="box2">
                    <div className="row m-0 p-0">
                        <div className="col-md-6">
                            <input type="text" name="nombreEnvio" id="nombreEnvio" placeholder="Nombre" className="form-control" value={formData.nombreEnvio} onChange={handleChangeInput}/>
                            <input type="text" name="telefonoEnvio" id="telefonoEnvio" placeholder="Telefono" className="form-control" value={formData.telefonoEnvio} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" name="ciudadEnvio" id="ciudadEnvio" placeholder="Ciudad" className="form-control" value={formData.ciudadEnvio} onChange={handleChangeInput}/>
                            <input type="text" name="direccionEnvio" id="direccionEnvio" placeholder="Direccion" className="form-control" value={formData.direccionEnvio} onChange={handleChangeInput}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </form>
    )
}

export default CreateClient
