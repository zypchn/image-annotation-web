import {useRef, useState} from "react";

const OTPInput = ({ length, onChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);
    
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
        
        onChange(newOtp.join(""));
    };
    
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    };
    
    return (
        <div className={"otp-container"}>
            {otp.map((_, index) => (
                <input key={index} type={"text"} maxLength={1} value={otp[index]} className={"otp-input"}
                inputMode={"numeric"} onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => inputRefs.current[index] = el}/>
            ))}
        </div>
    );
};

export default OTPInput;