import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";
import AssignTablet from "../components/AssignTablet.jsx";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
    
    const [userData, setUserData] = useState({});
    const {user} = useAuthContext();
    const id = user.userID;
    const [assignedTablets, setAssignedTablets] = useState([]);
    
    useEffect(() => {
        axios.get(`${apiUrl}/user/${id}`)
        .then((response) => {setUserData(response.data)});
    }, [id]);
    
    useEffect(() => {
            axios.get(`${apiUrl}/user/${id}/assigned`)
            .then((response) => {setAssignedTablets(response.data)});
    }, [id]);
    
    return (
        <div>
            <Navbar/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-12 col-lg-7 mb-4 profile-container"}>
                        <h1 className={"profile-header"} style={{textAlign: "center"}}> My Profile </h1>
                        <div className={"mb-3 profile-detail"}>
                            <h3><strong> Name </strong></h3>
                            <p id={"name"}> {userData.name} </p>
                        </div>
                        <div className={"mb-3 profile-detail"}>
                            <h3><strong> Email </strong></h3>
                            <p id={"email"}> {userData.email} </p>
                        </div>
                        <div className={"mb-3 profile-detail"}>
                            <h3><strong> Role </strong></h3>
                            <p id={"role"}> {userData.role} </p>
                        </div>
                    </div>
                    <div className={"col-lg-4 col-md-12 tablets-list-container"}>
                        <h3 className={"mb-4 mt-1 tablets-header"} style={{textAlign: "center"}}> Assigned Tablet(s) List &nbsp; #{assignedTablets.length}</h3>
                        <div className={"custom-scrollbar"}>
                            <ul className={"list-group"} style={{height: 280, overflow: "scroll"}}>
                                {assignedTablets && Object.keys(assignedTablets).map((tabletID) => {
                                    return <li key={tabletID} className={"list-group-item"}> Tablet ID: <strong>{assignedTablets[tabletID] ? assignedTablets[tabletID] : tabletID}</strong>
                                        <a href={`/tablet/${tabletID}`} id={"profile-label-btn"} className={"btn btn-secondary align-items-center"}> Label </a> </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                { userData.role === "Moderator" && <AssignTablet assignedTablets={assignedTablets}/> }
            </div>
        </div>
    )
};

export default ProfilePage;