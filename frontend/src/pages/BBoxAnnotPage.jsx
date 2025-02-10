import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";
import BBoxAnnotTool from "../components/BBoxAnnotTool.jsx";

const apiUrl = process.env.REACT_APP_API_URL;

const BBoxAnnotPage = () => {
    
    const {user} = useAuthContext();
    const {id} = useParams();
    const [tablet, setTablet] = useState({});
    const [tabletAnnots, setTabletAnnots] = useState({});
    const navigate = useNavigate();
    const [lockStatus, setLockStatus] = useState(false);
    
    useEffect(() => {
        
        const unlockPage = async () => {
            if (user) {
                await axios.patch(`${apiUrl}/tablets/${id}/lock`, {
                    isLocked: 0
                }, {
                    headers: {"Authorization": `Bearer ${user.token}`}
                }).then().catch();
            }
        };
        
        const onRender = async () => {
            
            if (user) {
                
                try {
                    const assignedResponse = await axios.get(`${apiUrl}/tablets/${id}/assigned`, {
                        headers: {"Authorization": `Bearer ${user.token}`}
                    });
                    
                    const assignedUsers = assignedResponse.data;
                    
                    if (!assignedUsers.includes(user.userID)) {
                        setLockStatus(true);
                        window.alert(`You do not have access to Tablet ${id}`);
                        navigate("/tablet");
                        return
                    }
                    
                    const tabletResponse = await axios.get(`${apiUrl}/tablets/${id}`, {
                        headers: {"Authorization": `Bearer ${user.token}`}
                    });
                    
                    const tablet = tabletResponse.data;
                    
                    if (tablet.isLocked !== 0) {
                        setLockStatus(true);
                        window.alert(`Someone else is working on Tablet ${id}\nPlease choose another one`);
                        navigate("/tablet");
                        return
                    }
                    
                    const annotResponse = await axios.get(`${apiUrl}/annots/${id}`, {
                        headers: {"Authorization": `Bearer ${user.token}`}
                    });
                    
                    const annot = annotResponse.data;
                    
                    setTablet(tablet);
                    setTabletAnnots(annot);
                    
                    await axios.patch(`${apiUrl}/tablets/${id}/lock`, {isLocked: 1}, {
                        headers: {"Authorization": `Bearer ${user.token}`}
                    });
                    
                } catch (error) {
                    console.error("Error during API calls:", error);
                }
            }
        };
        if (!lockStatus) {
            window.addEventListener("beforeunload", unlockPage);
        }
        onRender().then();
    }, [id, lockStatus, navigate, setTablet, user]);
    
    
    return (
        <div>
            <Navbar/>
            <BBoxAnnotTool key={tablet.id} tablet={tablet} tabletAnnots={tabletAnnots}/>
        </div>
    );
};

export default BBoxAnnotPage;