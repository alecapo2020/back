import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Store } from "../store/store";
import Cookies from 'universal-cookie';


const Login = () => {
    const cookies = new Cookies();
    const history = useHistory();
    const [data, SetData] = useContext(Store)
    const [form, setForm] = useState([])
    
    const formHandler = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
      }
    
    const loginHandler = (e) => {
        e.preventDefault();

        const body = "a";

        axios.post(`${process.env.REACT_APP_SERVIDOR}/api/usuarios`,body,{
            headers:{
                token:'JaRvIs92!',
                correo:form.correo,
                password:form.password
            }
        }).then(e=>{
            const token = e.data.token;
            const tokenAuth = token.slice(0,1) * 3
            
            if((tokenAuth === 9)){
                
                localStorage.setItem('logged',true)
                SetData({logged:true,})
                cookies.set('token', '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03', { path: '/' });
                history.replace('/inicio')
                console.log('autenticado')

            }else{
                return console.log("Error de autenticacion")
            }

            
            
            
            console.log(e.data)
        }).catch(e=>console.log('Error de autenticacion'))
        
    }

    return (
        <div>
            <div className="contenedor">
                <div className="col-3 mx-auto text-white" style={{marginTop:'20%'}}>
                    <form action="" onSubmit={loginHandler}>
                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input type="text" className="form-control" name="correo" id="correo" onChange={formHandler}/>    
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={formHandler}/>    
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
