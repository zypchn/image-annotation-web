import {useState} from "react";
import axios from "axios";

const SidebarUpload = () => {
    
    const [file, setFile] = useState();
    
    const handleUpload = (e) => {
        const formData = new FormData()
        formData.append("file", file);
        axios.post("http://localhost:4000/tablets", formData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
        console.log(formData.values())
    }
    
    return(
        <div className={"file-upload-container"}>
            <div className={"mx-3"}>
                <input type={"file"} style={{color: "white"}} onChange={e => setFile(e.target.files[0])} required={true}/>
                <button className={"upload-button my-3"} onClick={handleUpload}> Upload </button>
            </div>
        </div>
    );
}

export default SidebarUpload;