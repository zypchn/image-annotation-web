import AnnotTool from "../components/AnnotTool.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const AnnotPage = () => {
    
    const { id } = useParams();
    const [tablet, setTablet] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:4000/tablets/${id}`).then((response) => {
            setTablet(response.data);
        });
    }, []);
    
    return (
        <div>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;