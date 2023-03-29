import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch"

import Swal from "sweetalert2";

import Cotizador from "../tools/class.cotizador"

const Formulario = ({costoMetro2, guardarDatos}) => {
    
    const {data, loading, error} = useFetch("https://6334c678ea0de5318a08cea5.mockapi.io/cotizacion")

    const [disabled, setDisabled] = useState(true)
    const [datos, setDatos] = useState({
        fechaHora: "1/1/2023, 00:00:00",
        precio: 0,
        propiedad:"...",
        ubicacion:"...",
        metros:20,
    })




    const handleSubmit = (e)=>{
        e.preventDefault()
        //Validacion de los datos
        if(datos.propiedad.trim() === "..." || !datos.ubicacion.trim() === "..."){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Rellena los campos obligatorios',
                
              })
        }

        //Actualizando la fecha
        const fecha = new Date()
        const fechaFinal = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()},${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}` 

        //Actualizando el precio 
        let propiedad = data.find(
            el => el.tipo === datos.propiedad
        )
        let ubicacion = data.find(
            el => el.tipo === datos.ubicacion
        )
        const cotizacion = new Cotizador(costoMetro2,propiedad.factor, ubicacion.factor, datos.metros)
        
       

        //Actualizando el estado
        Swal.fire({
            title: 'Cotización realizada con éxito',
            icon: 'success',
          }).then(()=>setDatos({
            ...datos, metros: parseInt(datos.metros), fechaHora: fechaFinal, precio: parseFloat(cotizacion.cotizarPoliza()),
       }))
     
     
        
        setDisabled(false)
      
    }

    const handleChange = (e)=>{
        //Actualiza los datos cuando son cambiados
        setDatos({
            ...datos, [e.target.name] : e.target.value
        })
    }

    const handleClick = ()=>{
        Swal.fire({
            title: 'Datos guardados con éxito',
            icon: 'success',
          }),
        guardarDatos(datos),
        setDisabled(true)
    }



    function saveButton() {
        if (!disabled){
              return (
            <button type="button" onClick={handleClick} className="btn btn-dark guardar"><i className="bi bi-cloud-download"></i></button>
        );
        }
      
      }


    //Muestra en consola cuando el estado "datos" es actualizado
    useEffect(()=>{
        console.log(datos);
    },[datos])
    return (

        <div className="container formRoot">
       
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="text-center">Selecione el tipo de propiedad</p>
                    <select className="form-control" name="propiedad" value={datos.propiedad} onChange={handleChange} >
                        <option disabled value="...">...</option>
                        {
                            data.filter(
                                (el)=>el.categoria === "propiedad"
                            ).map((el,index)=>(<option key={index} value={el.tipo}>{el.tipo}</option>))
                        }
                    </select>
                </div>
                <div>
                    <p className="text-center">Selecione su ubicacion</p>
                    <select className="form-control" name="ubicacion" id="ubicacion" value={datos.ubicacion} onChange={handleChange} >
                        <option value="...">...</option>
                        {
                            data.filter(
                                (el)=>el.categoria === "ubicacion"
                            ).map((el,index)=>(<option key={index} value={el.tipo}>{el.tipo}</option>))
                        }
                    </select>
                </div>
                <div>
                    <p className="text-center">Seleccione la cantidad de metros cuadrados</p>
                    <input className="form-control" min={5} max={1000} type="number" name="metros" value={datos.metros} onChange={handleChange}/>
                </div>
                
                <p className="text-center display-5">Presupuesto estimado ${datos.precio}</p>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button className="btn btn-primary" type="submit">Cotizar</button>
                    
                    {
                        saveButton()
                    }
         
                </div>
                
                
            </form>
    
         
        </div>
    );
}
 
export default Formulario
