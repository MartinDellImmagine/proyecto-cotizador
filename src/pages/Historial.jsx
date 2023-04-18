import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import Swal from "sweetalert2";



const Historial = () => {
    const { user } = useUserContext()

    const { data, loading, error } = useFetch(`https://cotizador-9a996-default-rtdb.firebaseio.com/history/${user.uid}.json?auth=${user.accessToken}`)

    const array = []


    useEffect(() => {
        if (data !== null) {
            //console.log('aca');
            convertirData()
            setHistorial(array)
        }
    }, [data])

    const convertirData = () => {
        Object.entries(data).forEach(([key, value]) => {
            array.push(value)
        });
    }




    const [historial, setHistorial] = useState([])


    const deleteAll = async (datos) => {


        const response = await fetch(`https://cotizador-9a996-default-rtdb.firebaseio.com/history/${user.uid}.json?auth=${user.accessToken}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        console.log(response);
    }

    const handleClick = () => {
        Swal.fire({
            title: 'Do you want to clean your listing history?',
            showCancelButton: true,
            confirmButtonText: 'yes',
            
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('All your listing history has been deleted')

                setHistorial([])
                localStorage.setItem("historial", JSON.stringify([]))
                deleteAll()

            }
        })






    }
    const table = () => {
        if (historial.length > 0) {
            return (
                historial.map((e, index) => (
                    <tr key={index}>
                        <th scope="row">{e.fechaHora}</th>
                        <td>{e.propiedad}</td>
                        <td>{e.ubicacion}</td>
                        <td>{e.metros}</td>
                        <td>${e.precio}</td>
                    </tr>
                ))
            )
        } else {
            return (
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
                        {
                            historial.length > 0 && <button onClick={handleClick} className="btn btn-danger flex-end">Limpiar el historial</button>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}

export default Historial;