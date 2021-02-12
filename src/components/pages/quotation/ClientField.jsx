import React,{useState} from 'react'
import terceros from '../../includes/data/terceros.json'

const ClientField = () => {
    
    const datos = terceros[2].data
    
    const [data, setData] = useState(datos);
    const [cotizacion, setCotizacion] = useState({idCliente: ''})
    
    function campoDatos(e){
        const selectTable = document.getElementById('searchList');
        selectTable.removeAttribute('class','d-none')
        selectTable.setAttribute('class','table table-dark table-hover d-show')
        
        
        const searchField = e.target.value;
        if(searchField === ""){
            selectTable.setAttribute('class','table table-dark table-hover d-none')
        }

        
        const resultado = data.filter((data) => {
            return data.empresa.includes(searchField);
        });
        
        searchField.length < 1 ? setData(datos)  : setData(resultado)
         
        if(searchField.length > 1 && resultado.length === 0){
            // selectTable.innerHTML = "<td>no hay data</td>"
            setData(datos)
        }
    }

    function coti (i){
        setCotizacion({idCliente: i.idCliente})
        const selectTable = document.getElementById('searchList');
        const searchInput = document.getElementById('searchInput');
        searchInput.value = i.empresa
        selectTable.setAttribute('class','table table-dark table-hover d-none')

    }

    return (
        <>
            <input type="text" name="product" className="form-control" onChange={(e)=>{campoDatos(e)}} id="searchInput" placeholder="Ingresa un nombre para buscar"/>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-dark table-hover d-none" id="searchList">
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Nit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i,index)=> 
                            <tr key={index} onClick={()=>coti(i)}>
                                <td>{i.empresa}</td>
                                <td>{i.nit}</td>
                            </tr>  
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2"><a href="/"> Crear Nuevo</a></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default ClientField;
