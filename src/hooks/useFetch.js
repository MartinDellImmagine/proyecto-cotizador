import { useCallback, useEffect, useState } from "react"

export const useFetch = (URL) =>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    
    const fetchData = useCallback(async()=>{
        
        setLoading(true)
        try {
            const res = await fetch(URL)
            
            if(!res.ok) throw Error('Error al consumir la api')

            const data = await res.json()
         
            setData(data)
            
        } catch (error) {
            console.log(error);
            setError(error.message)
            setData([])
        } finally{
            setLoading(false)
        }
        
        
    
    }, []) 
    
    useEffect(()=>{
        fetchData()
    }, [])
    
    
    return{data, loading, error};
}