const LoginPage = () => {
    return (
        
        <div className={"login"}>
            <div className={"container-fluid"}>
                <div className={"row justify-content-center align-items-center h-100"}>
                    <div className={"col-12"}>
                        <div className={"card bg-dark text-white my-5 mx-auto"} style={{borderRadius: "1rem", maxWidth: "400px"}}>
                            <div className={"card-body p-5 d-flex flex-column align-items-center mx-auto w-100"}>
                                <h2 className={"fw-bold mb-4"}> Log In </h2>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Email"} type={"text"}/>
                                <input className={"form-control mb-4 mx-5 w-100"} placeholder={"Parola"} type={"password"}/>
                                <a href={"/tablets/"} className={"btn btn-outline-light mx-2 px-5"}> login </a>
                                <text className={"mt-4"}> Not a member? <a href={"/signup"}> Sign Up </a> </text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default LoginPage;