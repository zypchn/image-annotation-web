import { useAuthContext } from "./useAuthContext.js";
import {useState} from "react";
import axios from "axios";

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    
    const signup = async (name, email, password, role) => {
        setError(null);
        
        const response = await axios.post("http://localhost:4000/user/signup",
            {name, email, password, role}, {
                headers: {"Content-Type": "application/json"}
            })
        .then().catch(err => setError(err.response.data));
        
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
    };
    
    return { signup, error };
};