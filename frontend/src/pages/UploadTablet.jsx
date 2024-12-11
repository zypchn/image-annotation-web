import {useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";
import Footer from "../components/Footer.jsx";

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
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
    };
    
    return (
        <div>
            <Navbar/>
            <div className={"container"}>
                <input type={"file"} onChange={handleFile}/>
                <button onClick={handleUpload}> Upload</button>
                {showAlert && <span className={"alert alert-success my-2 mx-3"} style={{textAlign: "center"}}>
                    <strong> File Uploaded Successfully! </strong></span>}
            </div>
            <Footer />
        </div>
    );
};

export default UploadTablet;