import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Store } from '../../../../store/store';

const Create = () => {

    const history = useHistory();
    const [data, SetData] = useContext(Store)
    console.log(data)
    if(localStorage.getItem('logged') === 'false' || data.logged !== true){
      console.log('error de autenticacion')
    //   history.replace('/login')
    }
    
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState({
        cantidad:0,
        producto:"",
        precio:0,
        subtotal:""
    })
    
    const handleProducts = (e)=>{
        setProducto({...producto,[e.target.name]:e.target.value})
    }
      
    if( producto.cantidad !== 0){
        document.getElementById('subtotal').value = parseInt(producto.cantidad) * parseInt(producto.precio)
        producto.subtotal = producto.cantidad * producto.precio
    }
    
    const productosHandler = ()=>{
        setProductos([...productos,producto])
    }

    
    let total=0
    productos.forEach(function(a){total += a.subtotal;});
    
    console.log(total)
    
    

    return (
        <div className="container py-5 text-white">
            <table className="table bg-white">
                <tbody>
                    <tr>
                        <td>
                            <input type="text" name="cantidad" id="cantidad" className="form-control" placeholder="cantidad" onChange={handleProducts}/>
                        </td>
                        <td>
                            <select name="producto" id="producto" className="form-control" onChange={handleProducts}>
                                <option>- Seleccione - </option>
                                <option value="Manillas Tyvek - Rojo">Manillas Tyvek Rojo</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" name="precio" id="precio" className="form-control" placeholder="precio" onChange={handleProducts}/>
                        </td>
                        <td>
                            <input type="text" name="subtotal" id="subtotal" className="form-control" placeholder="subtotal" onChange={handleProducts}/>
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={productosHandler}>Agregar</button>
                        </td>
                    </tr>
                </tbody>
                
            </table>

            <table className="table bg-white">
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>producto</th>
                        <th>precio</th>
                        <th>subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        productos.map(i=>
                            <tr>
                                <td>{i.cantidad}</td>
                                <td>{i.producto}</td>
                                <td>{i.precio}</td>
                                <td>{i.subtotal}</td>
                            </tr>    
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Create
