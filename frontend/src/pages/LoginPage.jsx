import {useEffect, useState} from "react";
import {useLogin} from "../hooks/useLogin.js";

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error} = useLogin();
    
    const handleSubmit = async (e) => {
        e.preventDefault();   // to prevent refresh after submitting
        await login(email, password);
    };
    
    const handlePasswordVisibility = () => {
        let passwordField = document.getElementById("input-password");
        if (passwordField.type === "password") { passwordField.type = "text" }
        else if (passwordField.type === "text") { passwordField.type = "password" }
    };
    
    return (
        
        <form className={"login"} onSubmit={handleSubmit}>
            <div className={"container-fluid"}>
                <div className={"row justify-content-center align-items-center h-100"}>
                    <div className={"col-12"}>
                        <div className={"card bg-dark text-white my-5 mx-auto"} style={{borderRadius: "1rem", maxWidth: "400px"}}>
                            <div className={"card-body p-5 d-flex flex-column align-items-center mx-auto w-100"}>
                                <h2 className={"fw-bold mb-4"}> Log In </h2>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Email"} type={"text"}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <input id={"input-password"} className={"form-control mb-4 mx-5 w-100"} placeholder={"Password"} type={"password"}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <i id={"eye-icon-login"} className={"fa-regular fa-eye-slash"} onClick={() => handlePasswordVisibility()}/>
                                { error && <div className={"alert alert-danger"}> {error} </div> }
                                <button className={"btn btn-outline-light mx-2 px-5"}> login </button>
                                <h6 className={"mt-4"}> Not a member? <a href={"/signup"}> Sign Up </a> </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"trex-container"}>
                <img alt={"trex"} src={"/images/trex.png"}/>
            </div>
        </form>
        
    );
}

export default LoginPage;