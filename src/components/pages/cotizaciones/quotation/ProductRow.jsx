import React,{useEffect,useState} from 'react'
import axios from 'axios'

const ProductRow = (a) => {
    const [productos, setProductos] = useState()

    const getProducts = ()=>{
        axios.get('http://127.0.0.1:8000/api/productos')
        .then((req)=>setProductos(req.data))
        .catch(e=>console.log(e))
    }
    

   function sumatoria(){
    let selector0 = document.getElementById(`totalInput0`).value;
    let selector1 = document.getElementById(`totalInput1`);
    // let selector2 = document.getElementById(`totalInput2`);
    // let selector3 = document.getElementById(`totalInput3`);


    if(selector1 === null){
        selector1 = 0
    }else{
         selector1 = document.getElementById(`totalInput1`).value;
    }
    // if(selector2  === 'undefined'){
    //     selector2 = 0
    // }

  const total = parseInt(selector0) + parseInt(selector1)
 
  a.funcionD(total)
  console.log(productos)
    
} 
   
   
    function sum(a){
        const selectorTotal = document.getElementById(`totalInput${a}`);
        const selectorQuantity = document.getElementById(`quantity${a}`).value;
        const selectorPrice = document.getElementById(`vunit${a}`).value;
        const total = parseInt(selectorQuantity) * parseInt(selectorPrice);
        selectorTotal.value = total;
        sumatoria()
    }

    useEffect(() => {
        getProducts();
    }, [])
    
    return (
              <tr>
                    <td>
                        <select name="nombreProducto"  id={'nombreProducto'+a.contador}  className="productImput">
                        {productos ? 
                            productos.map((i)=>      
                                <option value={i.nombre +'-'+ i.color} key={i.idProducto}> {i.nombre} - {i.color}</option>
                            )
                        
                          : <option> Cargando...</option>
                        }

                          
                            
                        </select>
                    </td>
                    <td><input type="text" className="productImput" name="quantity" id={'quantity'+a.contador} defaultValue="1000"/></td>
                    <td><input type="text" className="productImput" defaultValue="0" name="vunit" id={'vunit'+a.contador} onChange={()=>{sum(a.contador)}}/></td>
                    <td><input type="text" className="productImput" name="totalInput" id={'totalInput'+a.contador}/></td>
                    <td><i className="fas fa-times text-danger fa-lg"></i></td>
            </tr>
    )
}

export default ProductRow
