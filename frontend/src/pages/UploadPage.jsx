import {useState} from "react";
import axios from "axios";

const UploadPage = () => {
    
    const [file, setFile] = useState();
    const [name, setName] = useState();
    
    const handleUpload = (e) => {
        const formData = new FormData()
        formData.append("file", file);
        formData.append("fileName", name);
        axios.post("http://localhost:4000/tablets/create", formData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
        console.log(formData.keys())
    }
    
    return(
        <div>
            <div>
                <input type={"file"} onChange={e => setFile(e.target.files[0])} />
                <button onClick={handleUpload}> Upload </button>
            </div>
            <div>
                <input type={"text"} onChange={e => setName(e.target.value)}/>
            </div>
        </div>
    );
}

export default UploadPage;