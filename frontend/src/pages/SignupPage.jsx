import {useState} from "react";
import {useSignup} from "../hooks/useSignup.js";
import {useOTPVerification} from "../hooks/useOTPVerification.js";
import OTPInput from "../components/OTPInput.jsx";

const SignupPage = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [OTP, setOTP] = useState("");
    
    const {signup, signupError, otpSent} = useSignup();
    const {otpVerification, otpError} = useOTPVerification();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, email, password, role);
    };
    
    const handleOtpChange = (otp) => {
        setOTP(otp)
    };
    
    const handleOTP = async (e) => {
        e.preventDefault();
        await otpVerification(email, OTP);
    };
    
    const handlePasswordVisibility = () => {
        let passwordField = document.getElementById("input-password");
        if (passwordField.type === "password") {
            passwordField.type = "text"
        } else if (passwordField.type === "text") {
            passwordField.type = "password"
        }
    };
    
    return (
        <div>
            <form className={"signup"} onSubmit={otpSent ? handleOTP : handleSubmit}>
                <div className={"container-fluid"}>
                    <div className={"row justify-content-center align-items-center h-100"}>
                        <div className={"col-12"}>
                            <div className={"card bg-dark text-white my-5 mx-auto"}
                                 style={{borderRadius: "1rem", maxWidth: "400px"}}>
                                <div className={"card-body p-5 d-flex flex-column align-items-center mx-auto w-100"}>
                                    <h2 className={"fw-bold mb-4"}> Sign Up </h2>
                                    <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Name"} type={"text"}
                                           onChange={(e) => setName(e.target.value)}/>
                                    <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Email"}
                                           type={"email"}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    <input id={"input-password"} className={"form-control mb-4 mx-5 w-100"}
                                           placeholder={"Password"} type={"password"}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <i id={"eye-icon"} className={"fa-regular fa-eye-slash"}
                                       onClick={() => handlePasswordVisibility()}/>
                                    <div className={"radio-group mb-2"}
                                         onChange={(e) => setRole(e.target.value)}>
                                        <input type={"radio"} id={"student"} name={"role"} value={"Student"}/> &nbsp;
                                        <label htmlFor={"Student"}> Student </label>
                                        &emsp; &ensp;
                                        <input type={"radio"} id={"moderator"} name={"role"}
                                               value={"Moderator"}/> &nbsp;
                                        <label htmlFor={"Moderator"}> Moderator </label>
                                    </div>
                                    {otpSent &&
                                        <div className={"alert alert-info text-center"}> One-Time Password has been sent
                                            to the following recipient: <b>{email}</b></div>}
                                    {otpSent && <OTPInput length={4} onChange={handleOtpChange}/>}
                                    {signupError && <div className={"alert alert-danger"}> {signupError} </div>}
                                    {otpError && <div className={"alert alert-danger"}> {otpError} </div>}
                                    {!otpSent && <button className={"btn btn-outline-light mx-2 mt-2 px-5"}
                                                         onClick={() => handleSubmit}> sign up </button>}
                                    {otpSent && <button className={"btn btn-outline-light mx-2 mt-2 px-5"}
                                                        onClick={() => handleOTP}> sign up </button>}
                                    <h6 className={"mt-4"}> Already a member? <a href={"/login"}> Login </a></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"trex-container"}>
                    <img alt={"trex"} src={"/images/trex.png"}/>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;