import Formulario from '../components/Formulario'

import {useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext'


function Cotizador() {
  const { user } = useUserContext()


  const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem("historial")) || [])
  const costoMetro2 = 32

  const guardarDatos =(datos)=>{
    post(datos)


    setHistorial(
      [
         ...historial, datos
      ]
        
    )
   
  }
  
  const post = async (datos)=>{


    const response = await fetch(`https://cotizador-9a996-default-rtdb.firebaseio.com/history/${user.uid}.json?auth=${user.accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    console.log(response);
  }

  useEffect(()=>{
    //localStorage.setItem("historial", JSON.stringify(historial))
   

  },[historial])


  return (
    <div className="Cotizador">
        <p className="text-center display-1 mb-5">Cotizador</p>
        <Formulario costoMetro2={costoMetro2} historial={historial} guardarDatos={guardarDatos} />
      
    </div>
  )
}

export default Cotizador
