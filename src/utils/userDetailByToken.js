import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'



export const handledecodeToken = (token)=>{
    try{
        if(!token) return new Error("Token not recieve for decode")
    
    const decodedToken = jwtDecode(token)
    return decodedToken
    }catch(err){
        console.log(err)
        toast.error("Something went wrong")
    }
}

