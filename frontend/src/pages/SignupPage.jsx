const SignupPage = () => {
    return (
        
        <div className={"login"}>
            <div className={"container-fluid"}>
                <div className={"row justify-content-center align-items-center h-100"}>
                    <div className={"col-12"}>
                        <div className={"card bg-dark text-white my-5 mx-auto"} style={{borderRadius: "1rem", maxWidth: "400px"}}>
                            <div className={"card-body p-5 d-flex flex-column align-items-center mx-auto w-100"}>
                                <h2 className={"fw-bold mb-4"}> Sign Up </h2>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Ad Soyad"} type={"text"}/>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Email"} type={"email"}/>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Parola"} type={"password"}/>
                                <div className={"radio-group mb-2"}>
                                    <input type={"radio"} id={"student"} name={"role"} value={"Student"}/> &nbsp;
                                    <label htmlFor={"Student"}> Student </label>
                                    &emsp; &ensp;
                                    <input type={"radio"} id={"moderator"} name={"role"} value={"Moderator"}/> &nbsp;
                                    <label htmlFor={"Moderator"}> Moderator </label>
                                </div>
                                <a href={"/tablets/"} className={"btn btn-outline-light mx-2 mt-2 px-5"}> sign up </a>
                                <text className={"mt-4"}> Already a member? <a href={"/login"}> Login </a> </text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default SignupPage;