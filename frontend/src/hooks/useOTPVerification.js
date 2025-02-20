/*

##########
Using React Hooks to keep track of OTP Verification from email
##########

*/

import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export const useOTPVerification = () => {
    
    const [otpError, setError] = useState(null);
    const navigate = useNavigate();
    
    const otpVerification = async (email, otp) => {
        setError(null);
        try {
            await axios.post(`${apiUrl}/user/verifyOTP`,
                {userEmail: email, otp}).then(response => {
                    if (response.status === 200) {
                        navigate("/login");
                    }
            }).catch(error => setError(error.response.data))
        } catch (error) { console.log(error.message) }
        
    };
    
    return { otpVerification, otpError };
};