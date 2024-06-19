import AnnotTool from "../components/AnnotTool.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const AnnotPage = () => {
    
    const { id } = useParams();
    const [tablet, setTablet] = useState({});
    const {user} = useAuthContext();
    
    useEffect(() => {
        if (user) {
            
            const userID = user.userID;
            
            axios.get(`http://localhost:4000/tablets/${id}/assigned`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            }).then((response) => {
                const assignedUsers = response.data;
                if (!assignedUsers.includes(userID)) {
                    window.alert("You dont have access!");
                    window.location.href = "/tablet";
                }
            });
            
            axios.get(`http://localhost:4000/tablets/${id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            }).then((response) => {setTablet(response.data)});
        }
    }, [id, user]);
    
    return (
        <div>
            <Navbar isSearch={"hidden"}/>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;