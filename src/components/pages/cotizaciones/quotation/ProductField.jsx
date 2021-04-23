import React,{useEffect, useState} from 'react'
import axios from 'axios'

const ProductField = (q) => {
    
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState({
        cantidad:0,
        producto:"",
        precio:0,
        subtotal:""
    })
    const [productList, setProductList] = useState([])
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
    // console.log(total)
    q.subtotal(total)
    q.products(productos)
    q.totals()

    const getProductList = () =>{
        
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/productos`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
    .then((e)=>setProductList(e.data.productos))
    .catch(e=>console.log(e))
    }

    useEffect(() => {
        getProductList();
    }, [])
    
    return (
      
        <div className="bg-white text-dark p-4 clientData">
            <h3>Productos</h3>
            <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>V Unitario</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">                      
                        <tr>
                            <td>
                                <select name="producto"  id={'producto'}  className="productImput" onChange={handleProducts}>
                                    <option>Seleccione</option>
                                {
                                    productList.map(i=>
                                     
                                        <option key={i.id} value={i.subCategoria.nombre+' - '+i.color}>{i.subCategoria.nombre} - {i.color}</option>    
                                       
                                        )
                                }
                                </select>
                            </td>
                            <td><input type="text" className="productImput" name="cantidad" id={'cantidad'} defaultValue="1000" onChange={handleProducts}/></td>
                            <td><input type="text" className="productImput" defaultValue="0" name="precio" id={'precio'} onChange={handleProducts}/></td>
                            <td><input type="text" className="productImput" name="subtotal" id={'subtotal'} onChange={handleProducts}/></td>
                            <td><i className="fas fa-times text-danger fa-lg"></i></td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={productosHandler}>Agregar Producto</button>
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

                        productos.map((i,index)=>
                            <tr key={index}>
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

export default ProductField
