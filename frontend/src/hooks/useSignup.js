import { useAuthContext } from "./useAuthContext.js";
import {useState} from "react";
import axios from "axios";

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    
    const signup = async (name, email, password, role) => {
        setError(null);
        
        try {
            const response = await axios.patch("http://localhost:4000/user/verifyOTP",
                {name, email, password, role}, {
                    headers: {"Content-Type": "application/json"}
                })
            .then().catch(err => setError(err.response.data));
            
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: "LOGIN", payload: response.data });
        } catch(error) { console.log(error.message) }
    };
    
    return { signup, error };
};