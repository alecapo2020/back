import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const EditarCotizacion = () => {

    const [cotizacion, setCotizacion] = useState([])
    const history = useHistory();
    const getCotizacion = () => {
        axios.get(process.env.REACT_APP_SERVIDOR+'/api/cotizaciones/1146',{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>setCotizacion(e.data[0]))
        .catch(e=>console.log(e))
    }

    const submitHandler = (e) => {
        console.log('guardando...')
        e.preventDefault()
       
        const dat = {
            ClienteId:          e.target.elements['ClienteId'].value,
            vendedor:           e.target.elements['vendedor'].value,
            fecha:              e.target.elements['fecha'].value,
            fechaVencimiento:   e.target.elements['fechaVencimiento'].value,
            productos:          e.target.elements['productos'].value,
            tiempo_entrega:     e.target.elements['tiempo_entrega'].value,
            forma_pago:         e.target.elements['forma_pago'].value,
            observacionesCoti:  e.target.elements['observacionesCoti'].value,
            subtotal:           e.target.elements['subtotal'].value,
            envio:              e.target.elements['envio'].value,
            iva:                e.target.elements['iva'].value,
            total:              e.target.elements['total'].value,
        }
        const id = e.target.elements['id'].value
        

        axios.put(`${process.env.REACT_APP_SERVIDOR}/api/cotizaciones/${id}`,dat,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then(e=>{
            alert(e.data.msg)
            history.replace('/cotizaciones/ver')
            
        })
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        getCotizacion();
    }, [])

    return (
        <div className="container">
            <h1 className="text-white py-5">Editar Cotizacion</h1>
            <section className="bg-white p-5">
                <div className="col-md-6 col-sm-12 pb-5">
                    <form action="" onSubmit={submitHandler}>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Id de la Cotizacion</label>
                            <input type="text" name="id" id="id" className="form-control" defaultValue={cotizacion.id} readOnly/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Id de la Empresa</label>
                            <input type="text" name="ClienteId" id="ClienteId" className="form-control" defaultValue={cotizacion.ClienteId}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Vendedor</label>
                            <input type="text" name="vendedor" id="vendedor" className="form-control" defaultValue={cotizacion.vendedor}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Fecha</label>
                            <input type="text" name="fecha" id="fecha" className="form-control" defaultValue={cotizacion.fecha}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Fecha Vencimiento</label>
                            <input type="text" name="fechaVencimiento" id="fechaVencimiento" className="form-control" defaultValue={cotizacion.fechaVencimiento}/>
                        </div>
                        <h3>Productos</h3>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Productos</label>
                            <input type="text" name="productos" id="productos" className="form-control" defaultValue={cotizacion.productos}/>
                        </div>
                        <h3>Condiciones</h3>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Tiempo de Entrega</label>
                            <input type="text" name="tiempo_entrega" id="tiempo_entrega" className="form-control" defaultValue={cotizacion.tiempo_entrega}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Forma de Pago</label>
                            <input type="text" name="forma_pago" id="forma_pago" className="form-control" defaultValue={cotizacion.forma_pago}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Observaciones</label>
                            <input type="text" name="observacionesCoti" id="observacionesCoti" className="form-control" defaultValue={cotizacion.observacionesCoti}/>
                        </div>
                        <h3>Valores</h3>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Subtotal</label>
                            <input type="text" name="subtotal" id="subtotal" className="form-control" defaultValue={cotizacion.subtotal}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Envio</label>
                            <input type="text" name="envio" id="envio" className="form-control" defaultValue={cotizacion.envio}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Iva</label>
                            <input type="text" name="iva" id="iva" className="form-control" defaultValue={cotizacion.iva}/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="empresa">Total</label>
                            <input type="text" name="total" id="total" className="form-control" defaultValue={cotizacion.total}/>
                        </div>
                        <button className="btn btn-primary" type="submit">Guardar</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default EditarCotizacion
