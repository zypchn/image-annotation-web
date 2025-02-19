import {useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const apiUrl = process.env.REACT_APP_API_URL;

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
        axios.post(`${apiUrl}/tablets/upload`, formData, {
            headers: {"Authorization": `Bearer ${user.token}`}
        })
        .then(res => {
            console.log(res)
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1000);
        })
        .catch(err => console.log(err));
    };
    
    return (
        <div>
            <Navbar/>
            <div className={"container upload-container"}>
                <input type={"file"} onChange={handleFile}/>
                <button onClick={handleUpload}> Upload</button>
                {showAlert && <span className={"alert alert-success my-2 mx-3 upload-success-alert"}>
                    <strong> File Uploaded Successfully! </strong></span>}
            </div>
        </div>
    );
};

export default UploadTablet;