import AnnotTool from "../components/AnnotTool.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const AnnotPage = () => {
    
    const { id } = useParams();
    const [tablet, setTablet] = useState({});
    const isSearch = "hidden";
    
    useEffect(() => {
        axios.get(`http://localhost:4000/tablets/${id}`).then((response) => {
            setTablet(response.data);
        });
    }, []);
    
    return (
        <div>
            <Navbar isSearch={isSearch}/>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;