import React,{useContext, useState} from 'react'
import './style.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const CreateClient = () => {

    const history = useHistory();
    
    
    const cookies = new Cookies();
    if(localStorage.getItem('logged') !== 'true' || cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const urlApi = `${process.env.REACT_APP_SERVIDOR}/api/clientes`
    

    const [formData, setFormData] = useState({
        imagen:'/a.webp',
        empresa:'',
        nit:'',
        telefono:'',
        ciudad:'',
        direccion:'',
        departamento:'',
        contacto:'',
        celular:'',
        correo:'',
        segmento:'',
        esCliente:'',
        genero:'',
        medioContacto:'',
    })
   

    const handleChangeInput = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handlerForm =(e)=>{
        e.preventDefault();
        pushClient(formData);
    }

    const pushClient = (formData)=>{
        axios.post(urlApi,formData,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
      .then(res => {
        alert('guardado',res);
        history.replace('/clientes/ver')
      })
      .catch((e)=>console.log('el error'+e))
    }

    return (
        <form action="" id="form" onSubmit={(e)=>{handlerForm(e)}} >
        <div className="container mb-5"> 
            <div className="row mb-5">
                <div className="col-md-12 mt-5">
                    <h1 style={{color:'white'}}>Crear Cliente</h1>
                    <div className="box">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" name="empresa" id="empresa" placeholder="Nombre de la Empresa" className="form-control mt-4" value={formData.empresa} onChange={handleChangeInput} />
                                <input type="text" name="contacto" id="contacto" placeholder="Contacto" className="form-control mt-4" value={formData.contacto} onChange={handleChangeInput}/>
                                <input type="text" name="direccion" id="direccion" placeholder="Direccion" className="form-control mt-4" value={formData.direccion} onChange={handleChangeInput}/>
                                <input type="text" name="departamento" id="departamento" placeholder="departamento" className="form-control mt-4" value={formData.departamento} onChange={handleChangeInput}/>
                                <input type="text" name="celular" id="celular" placeholder="Celular" className="form-control mt-4" value={formData.celular} onChange={handleChangeInput}/>
                                <select name="medioContacto" id="medioContacto" className="sele mt-4" onChange={handleChangeInput}>
                                    <option value="Seleccione">- Medio Contacto -</option>
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
                                <input type="text" name="nit" id="nit" placeholder="Nit" className="form-control mt-4" value={formData.nit} onChange={handleChangeInput}/>
                                <input type="text" name="telefono" id="telefono" placeholder="Telefono" className="form-control mt-4" value={formData.telefono} onChange={handleChangeInput}/>
                                <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad" className="form-control mt-4" value={formData.ciudad} onChange={handleChangeInput}/>
                                <input type="text" name="correo" id="correo" placeholder="Correo" className="form-control mt-4" value={formData.correo} onChange={handleChangeInput}/>
                                <select name="genero" id="genero" className="sele mt-4" onChange={handleChangeInput}>
                                    <option>- Género -</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                                <select name="esCliente" id="esCliente" className="sele mt-3"   onChange={handleChangeInput}>
                                    <option>Es Cliente?</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        
                        
                       
                        <select name="segmento" id="segmento" className="sele mt-4"   onChange={handleChangeInput}>
                            <option>Segmento</option>
                            <option value="hoteles">Hoteles y Piscinas</option>
                            <option value="parques">Parques</option>
                            <option value="Bares">Bares</option>
                            <option value="Hospitales">Hospitales</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Distribuidor">Distribuidor</option>
                            <option value="Revendedor">Revendedor</option>
                            <option value="Empresa">Empresa</option>
                            <option value="Otro">Otro</option>
                        </select>
                       
                        <button type="submit" className="btn btn-success mt-4">GUARDAR</button>
                    </div>
                </div>
            </div>
           
            
        </div>
        </form>
    )
}

export default CreateClient
