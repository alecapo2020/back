import React from 'react'

const ProductField = () => {
    
    function sum(){
        alert('j')
        const selectorTotal = document.getElementById('totalInput');
        const selectorQuantity = document.getElementById('quantity').value;
        const selectorPrice = document.getElementById('Vunit').value;
        const total = parseInt(selectorQuantity) * parseInt(selectorPrice);
        selectorTotal.value = total;
    }
    
    function addProduct(){
    const selector = document.getElementById('tbody');
    const content = `   <tr>
    <td>
        <select name="" id="" className="productImput">
            <option value="">Manillas Tyvek</option>
            <option value="">Manillas Plasticas</option>
        </select>
    </td>
    <td><input type="text" className="productImput" name="quantity" id="quantity" defaultValue="0"/></td>
    <td><input type="text" className="productImput" defaultValue="0" name="Vunit" id="Vunit" onchange="{sum()}"/></td>
    <td><input type="text" className="productImput" name="totalInput" id="totalInput"/></td>
    <td><i class="fas fa-times text-danger fa-lg"></i></td>
</tr>`
    
    const newdiv = document.createElement("tr");    
    newdiv.innerHTML = content
    selector.appendChild(newdiv)
    
    }
    
    
    
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
                                    <select name="" id="" className="productImput">
                                        <option value="">Manillas Tyvek</option>
                                        <option value="">Manillas Plasticas</option>
                                    </select>
                                </td>
                                <td><input type="text" className="productImput" name="quantity" id="quantity" defaultValue="0"/></td>
                                <td><input type="text" className="productImput" defaultValue="0" name="Vunit" id="Vunit" onChange={()=>{sum()}}/></td>
                                <td><input type="text" className="productImput" name="totalInput" id="totalInput"/></td>
                                <td><i className="fas fa-times text-danger fa-lg"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={()=>{addProduct()}}>Agregar Producto</button>
        </div>
    )
}

export default ProductField
