import {useEffect} from 'react';
import {useFirebase} from '../context/Firebase';
import { useNavigate } from "react-router-dom";
const ProtectedR=({children})=>{
    const navigate=useNavigate();
    const firebase=useFirebase();
useEffect(()=>{
    if(!firebase.isLoggedIn){
        navigate("/login");
    }
},[firebase,navigate])

return children;
}
export default ProtectedR;