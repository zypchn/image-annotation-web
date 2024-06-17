import AnnotTool from "../components/AnnotTool.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const AnnotPage = () => {
    
    const { id } = useParams();
    const [tablet, setTablet] = useState({});
    const isSearch = "hidden";
    const {user} = useAuthContext();
    
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:4000/tablets/${id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            }).then((response) => { setTablet(response.data);} );
        }
    }, [user]);
    
    return (
        <div>
            <Navbar isSearch={isSearch}/>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;