import {useState} from "react";
import axios from "axios";
import {useTabletsContext} from "../hooks/useTabletsContext.jsx";
import {TabletsContextProvider} from "../context/TabletsContext.jsx";

const SidebarUpload = () => {
    
    const {dispatch} = useTabletsContext();
    
    const [file, setFile] = useState();
    
    const handleUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("http://localhost:4000/tablets", formData);
        const json = JSON.stringify(response);
        dispatch({type: "CREATE_TABLET", payload: json})
    }
        //console.log(formData.values())
    
    return(
        <TabletsContextProvider>
        <div className={"file-upload-container"}>
            <div className={"mx-3"}>
                <input type={"file"} style={{color: "white"}} onChange={e => setFile(e.target.files[0])} required={true}/>
                <button className={"upload-button my-3"} onClick={handleUpload}> Upload </button>
            </div>
        </div>
        </TabletsContextProvider>
    );
}

export default SidebarUpload;