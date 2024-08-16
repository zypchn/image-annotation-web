import {useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const UploadTablet = () => {
    
    const [showAlert, setShowAlert] = useState(false);
    
    const [file, setFile] = useState();
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
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
    };
    
    return(
        <div>
            <Navbar/>
            <div className={"container"}>
                <input type={"file"} onChange={handleFile}/>
                <button onClick={handleUpload}> Upload </button>
                {showAlert && <span className={"alert alert-success my-2 mx-3"} style={{textAlign: "center"}}>
                    <strong> Assigned Successfully! </strong></span>}
            </div>
        </div>
    );
};

export default UploadTablet;