import AnnotTool from "../components/AnnotTool.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const apiUrl = process.env.REACT_APP_API_URL;

const AnnotPage = () => {
    
    const {id} = useParams();
    const [tablet, setTablet] = useState({});
    const {user} = useAuthContext();
    
    const unlockPage = async () => {
        if (user) {
            await axios.patch(`${apiUrl}/tablets/${id}/lock`, {
                isLocked: 0
            }, {
                headers: {"Authorization": `Bearer ${user.token}`}
            }).then().catch();
        }
    }
    
    const handleBeforeUnload = (event) => {
        unlockPage().then();
        event.preventDefault();
        event.returnValue = '';
    };
    
    useEffect(() => {
        const onRender = async () => {
            if (user) {
                try {
                    const assignedResponse = await axios.get(`${apiUrl}/tablets/${id}/assigned`, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    });
                    
                    const assignedUsers = assignedResponse.data;
                    
                    if (!assignedUsers.includes(user.userID)) {
                        window.alert(`You do not have access to Tablet ${id}`);
                        return window.location.href = "/tablet";
                    }
                    
                    const tabletResponse = await axios.get(`${apiUrl}/tablets/${id}`, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    });
                    
                    const tablet = tabletResponse.data;
                    
                    if (tablet.isLocked !== 0) {
                        window.alert(`Someone else is working on Tablet ${id}\nPlease choose another one`);
                        return window.location.href = "/tablet";
                    }
                    
                    setTablet(tablet);
                    
                    await axios.patch(`${apiUrl}/tablets/${id}/lock`, { isLocked: 1 }, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    });
                } catch (error) {
                    console.error("Error during API calls:", error);
                }
            }
        };
        
        window.addEventListener("beforeunload", unlockPage);
        onRender().then();
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [id, user]);
    
    return (
        <div>
            <Navbar/>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;