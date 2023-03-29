import Formulario from '../components/Formulario'

import {useEffect, useState } from 'react'


function Cotizador() {
  const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem("historial")) || [])
  const costoMetro2 = 32

  const guardarDatos =(datos)=>{
    setHistorial(
      [
         ...historial, datos
      ]
        
    )
   
  }
  
  useEffect(()=>{
    localStorage.setItem("historial", JSON.stringify(historial))
  },[historial])


  return (
    <div className="Cotizador">
        <p className="text-center display-1 mb-5">Cotizador</p>
        <Formulario costoMetro2={costoMetro2} historial={historial} guardarDatos={guardarDatos} />
      
    </div>
  )
}

export default Cotizador
