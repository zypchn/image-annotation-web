/*

##########
Using React Hooks to keep track of SIGNUP operation
##########

*/

import {useState} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const useSignup = () => {
    
    const [signupError, setError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    //const { dispatch } = useAuthContext();
    
    const signup = async (name, email, password, role) => {
        setError(null);
        
        try {
            await axios.post(`${apiUrl}/user/signup`,
                {name, email, password, role}, {
                    headers: {"Content-Type": "application/json"}
                })
            .then(res => setOtpSent(true)).catch(err => setError(err.response.data));
            
            //localStorage.setItem("user", JSON.stringify(response.data));
            //dispatch({ type: "LOGIN", payload: response.data });
        } catch(error) { console.log(error.message) }
    };
    
    return { signup, signupError, otpSent };
};