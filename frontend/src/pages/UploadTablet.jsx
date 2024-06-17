import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const UploadTablet = () => {
    
    const [file, setFile] = useState();
    const isSearch = "hidden";
    const {user} = useAuthContext();
    
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("image", file);
        axios.post("http://localhost:4000/tablets/upload", formData, {
            headers: { "Authorization": `Bearer ${user.token}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
    
    return(
        <div>
            <Navbar isSearch={isSearch}/>
            <div className={"container"}>
                <input type={"file"} onChange={handleFile}/>
                <button onClick={handleUpload}> Upload </button>
            </div>
        </div>
    );
};

export default UploadTablet;