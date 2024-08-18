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
        async function onRender() {
            if (user) {
                const userID = user.userID;
                
                await axios.get(`http://localhost:4000/tablets/${id}/assigned`, {
                    headers: {"Authorization": `Bearer ${user.token}`}
                }).then((response) => {
                    const assignedUsers = response.data;
                    if (!assignedUsers.includes(userID)) {
                        window.alert(`You do not have an access to Tablet ${id}`);
                        return window.location.href = "/tablet";
                    }
                });
                
                await axios.get(`http://localhost:4000/tablets/${id}`, {
                    headers: {"Authorization": `Bearer ${user.token}`}
                }).then((response) => {
                    
                    if (response.data.isLocked !== 0) {
                        window.alert(`Someone else is working on Tablet ${id}\nPlease choose another one`)
                        return window.location.href = "/tablet"
                    }
                    
                    else {
                        setTablet(response.data)
                        axios.patch(`http://localhost:4000/tablets/${id}/lock`,{
                            isLocked: 1
                        }, {
                            headers: {"Authorization": `Bearer ${user.token}`}
                        }).then().catch();
                    }
                });
            }
        }
        
        async function unlockPage() {
            if (user) {
                await axios.patch(`http://localhost:4000/tablets/${id}/lock`,{
                    isLocked: 0
                }, {
                    headers: {"Authorization": `Bearer ${user.token}`}
                }).then().catch();
                return
            }
        }
        
        window.addEventListener("beforeunload", unlockPage);
        onRender().then();
    }, [id, user]);
    
    return (
        <div>
            <Navbar/>
            <AnnotTool key={tablet.id} tablet={tablet}/>
        </div>
    );
};

export default AnnotPage;