/*

##########
Using React Hooks to keep track of LOGIN operation
##########

*/

import { useAuthContext } from "./useAuthContext.js";
import {useState} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const useLogin = () => {
    
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    
    const login = async (email, password) => {
        setError(null);
        
        try {
            const response = await axios.post(`${apiUrl}/user/login`,
                {email, password}, {
                    headers: {"Content-Type": "application/json"}
                })
            .then().catch(err => setError(err.response.data));
            
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: "LOGIN", payload: response.data });
        } catch (error) { console.log(error.message) }
    };
    
    return { login, error };
};