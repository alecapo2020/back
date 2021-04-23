import React,{useState, useEffect} from 'react'
import axios from 'axios';

const ClientField = ({cliente}) => {
    const apiUrl = `${process.env.REACT_APP_SERVIDOR}/api/clientes`;
    const [data, setData] = useState([]);
    const [clientes, setClientes] = useState([]);
    

    const [cotizacion, setCotizacion] = useState({id: ''})

    
    function getData (){
        axios.get(apiUrl,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
            .then((data)=>{
                setData(data.data.clientes)
                setClientes(data.data.clientes)
            })       
            .catch(e=>console.log(e))   
    }

    
    useEffect(() => {
        getData();
    }, [])


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
        
        searchField.length < 1 ? setData(clientes)  : setData(resultado)
         
        if(searchField.length > 1 && resultado.length === 0){
            // selectTable.innerHTML = "<td>no hay data</td>"
            setData(data)
        }
    }



    function coti (i,cliente){
        setCotizacion({id: i.id})
        const selectTable = document.getElementById('searchList');
        const searchInput = document.getElementById('searchInput');
        searchInput.value = i.empresa
        selectTable.setAttribute('class','table table-dark table-hover d-none')
        cliente(i.id)
    }
   

    return (
        <>
            <input type="text" name="searchInput" className="form-control" onChange={(e)=>{campoDatos(e)}} id="searchInput" placeholder="Ingresa un nombre para buscar"/>
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
                            <tr key={index} onClick={()=>{coti(i,cliente)}}>
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
