import { useState } from "react";


const Historial = () => {
    const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem("historial")) || [])
    const handleClick = ()=>{
        setHistorial([])
        localStorage.setItem("historial", JSON.stringify([]))
    }
    const table = () =>{
        if(historial.length > 0){
            return(
                historial.map((e, index)=>(
                    <tr key={index}>
                        <th scope="row">{e.fechaHora}</th>
                        <td>{e.propiedad}</td>
                        <td>{e.ubicacion}</td>
                        <td>{e.metros}</td>
                        <td>${e.precio}</td>
                    </tr>
                ))
            )
        }else{
            return(
                <tr>
                <th scope="row">-</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                </tr>
            )
        }
    }
    return (
        <>
            <div className="container">
                <p className="text-center display-1">Historial</p>
                <div className="container">
                <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Fecha y Hora</th>
                                <th scope="col">Propiedad</th>
                                <th scope="col">Ubicacion</th>
                                <th scope="col">Metros Cuadrados</th>
                                <th scope="col">Poliza</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {
                                     table()
                                    }
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                        <button onClick={handleClick} className="btn btn-danger flex-end">Limpiar el historial</button>
                    </div>
                    
                </div>
            </div>
        </>
  
    );
}
 
export default Historial;