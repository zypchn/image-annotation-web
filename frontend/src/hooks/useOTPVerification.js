import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const useOTPVerification = () => {
    
    const [otpError, setError] = useState(null);
    const navigate = useNavigate();
    
    const otpVerification = async (email, otp) => {
        setError(null);
        try {
            await axios.post("http://localhost:4000/user/verifyOTP",
                {userEmail: email, otp}).then(response => {
                    if (response.status === 200) {
                        navigate("/login");
                    }
            }).catch(error => setError(error.message))
        } catch (error) { console.log(error.message) }
        
    };
    
    return { otpVerification, otpError };
};