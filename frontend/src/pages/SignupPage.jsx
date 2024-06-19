import {useState} from "react";
import {useSignup} from "../hooks/useSignup.js";

const SignupPage = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const {signup, error} = useSignup();
    
    const handleSubmit = async (e) => {
        e.preventDefault();   // to prevent refresh after submitting
        await signup(name, email, password, role);
    };
    
    return (
        
        <form className={"signup"} onSubmit={handleSubmit}>
            <div className={"container-fluid"}>
                <div className={"row justify-content-center align-items-center h-100"}>
                    <div className={"col-12"}>
                        <div className={"card bg-dark text-white my-5 mx-auto"} style={{borderRadius: "1rem", maxWidth: "400px"}}>
                            <div className={"card-body p-5 d-flex flex-column align-items-center mx-auto w-100"}>
                                <h2 className={"fw-bold mb-4"}> Sign Up </h2>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Ad Soyad"} type={"text"}
                                    onChange={(e) => setName(e.target.value)}/>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Email"} type={"email"}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Parola"} type={"password"}
                                     onChange={(e) => setPassword(e.target.value)}/>
                                <div className={"radio-group mb-2"}
                                onChange={(e) => setRole(e.target.value)}>
                                    <input type={"radio"} id={"student"} name={"role"} value={"Student"}/> &nbsp;
                                    <label htmlFor={"Student"}> Student </label>
                                    &emsp; &ensp;
                                    <input type={"radio"} id={"moderator"} name={"role"} value={"Moderator"}/> &nbsp;
                                    <label htmlFor={"Moderator"}> Moderator </label>
                                </div>
                                <button className={"btn btn-outline-light mx-2 mt-2 px-5"}> sign up </button>
                                { error && <div className={"error"}> {error} </div> }
                                <h6 className={"mt-4"}> Already a member? <a href={"/login"}> Login </a> </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"trex-container"}>
                <img alt={"trex"} src={"/trex.png"}/>
            </div>
        </form>
    );
}

export default SignupPage;