import React from 'react'
import ClientField from './ClientField'
import ProductField from './ProductField'

const Quotation = () => {
    
    const date = new Date().toLocaleDateString();
    // const fixedDate =   date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()

   
  function calcEnvio (vEnvio){
    
    // Envio
    const envio = document.getElementById('envio').value

    // Subtotal
    const selectorSubtotal = document.getElementById('subtotal')
    const subtotal =  parseInt(selectorSubtotal.value) + parseInt(vEnvio);
     
     // iva
     const iva = subtotal * 0.19;
     document.getElementById('iva').value = iva

     // Total
     const grandTotal = parseInt(subtotal) + parseInt(envio) + parseInt(iva);
     document.getElementById('Total').value = grandTotal

  }
        // document.getElementById('subtotal').value = 110000;
    

    return (
        <>
          <div className="container py-5 quotation">

                <section>
                    <div className="row">
                        <div className="col-md-6">
                            <h1>CREAR UNA COTIZACIÓN</h1>
                        </div>
                        <div className="col-md-6">
                            <button className="saveButton float-end me-5"><i className="fa fa-save"></i>Guardar</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-md-6 clientData">
                            <h3>Datos del Cliente</h3>
                            <h4>Empresa:</h4>
                            <ClientField/>
                            <h4 className="mt-3">Nombre del Vendedor:</h4>
                            <select name="vendor" id="vendor" className="">
                                <option value="">Seleccione</option>
                                <option value="">Medellin</option>
                                <option value="">Bogota</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col-md-8">
                                    <table className="dateTable">
                                        <tbody className="text-end">
                                            <tr>
                                                <td>No. Cotizacion:</td>
                                                <td><input type="text" className="dateInput"/></td>
                                            </tr>
                                            <tr>
                                                <td>Fecha:</td>
                                                <td><input type="text" value={date} className="dateInput"/></td>
                                            </tr>
                                        
                                            <tr>
                                                <td>Fecha Vencimiento:</td>
                                                <td><input type="text" value={date} className="dateInput"/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <ProductField />
                </section>
                <section className="py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="clientData">
                                <h3 className="mb-3">Condiciones</h3>
                                <div className="row">
                                    <div className="col-md-6 text-end">
                                        <p className="mb-4">Tiempo de Entrega:</p>
                                        <p className="mb-4">Forma de Pago:</p>
                                        <p className="mb-4">Observaciones:</p>
                                    </div>
                                    <div className="col-md-6">
                                        <select name="tiempoDeEntrega" id="tiempoDeEntrega">
                                            <option>- Seleccione -</option>
                                            <option value="1-3 dias">1 a 3 dias habiles</option>
                                        </select>
                                        <select name="formaDePago" id="formaDePago">
                                            <option>- Seleccione -</option>
                                            <option value="100% Anticipado">100% Anticipado</option>
                                        </select>
                                        
                                        <textarea name="" id="" cols="10" rows="5" className="form-control">Para Cheques y/o consignaciones elaborar a nombre de ALLCANYOUBUY SAS con Nit 900.694.948 -9 y consignar en BANCOLOMBIA AHORROS 05219729539</textarea>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="totales">
                                <div className="row">
                                    <div className="col-md-6 text-end">
                                        <p>Subtotal:</p>
                                        <p>Envio:</p>
                                        <p>Iva:</p>
                                        <p>Total:</p>
                                    </div>
                                    <div className="col-md-6">
                                        
                                        <p><input type="text" name="" id="subtotal" value='110000'/></p>
                                        <p><input type="text" name="envio" id="envio" defaultValue="0" onChange={(e)=>{calcEnvio(e.target.value)}}/></p>
                                        <p><input type="text" name="iva" id="iva" value="0"/></p>
                                        <p><input type="text" name="total" id="Total" defaultValue="0"/></p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
          </div>
        </>
    )
}

export default Quotation;
