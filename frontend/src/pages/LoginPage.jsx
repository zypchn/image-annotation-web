import {useState} from "react";
import {useLogin} from "../hooks/useLogin.js";
import {useAuthContext} from "../hooks/useAuthContext.js";

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error} = useLogin();
    
    const handleSubmit = async (e) => {
        e.preventDefault();   // to prevent refresh after submitting
        await login(email, password);
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
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Parola"} type={"password"}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <button className={"btn btn-outline-light mx-2 px-5"}> login </button>
                                { error && <div className={"error"}> {error} </div> }
                                <h6 className={"mt-4"}> Not a member? <a href={"/signup"}> Sign Up </a> </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
    );
}

export default LoginPage;