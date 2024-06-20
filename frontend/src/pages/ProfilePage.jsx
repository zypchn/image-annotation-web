import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";
import AssignTablet from "../components/AssignTablet.jsx";

const ProfilePage = () => {
    
    const [userData, setUserData] = useState({});
    const {user} = useAuthContext();
    const id = user.userID;
    const [assignedTablets, setAssignedTablets] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:4000/user/${id}`)
        .then((response) => {setUserData(response.data)});
    }, [id]);
    
    useEffect(() => {
            axios.get(`http://localhost:4000/user/${id}/assigned`)
            .then((response) => {setAssignedTablets(response.data)});
    }, [id]);
    
    return (
        <div>
            <Navbar isSearch={"hidden"}/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-8 col-md-12 mb-4 profile-section"}>
                        <h2 className={"mb-4"}> My Profile </h2>
                        <div className={"mb-3"}>
                            <label><strong> Name </strong></label>
                            <p id={"name"}> {userData.name} </p>
                        </div>
                        <div className={"mb-3"}>
                            <label><strong> Email </strong></label>
                            <p id={"email"}> {userData.email} </p>
                        </div>
                        <div className={"mb-3"}>
                            <label><strong> Role </strong></label>
                            <p id={"role"}> {userData.role} </p>
                        </div>
                    </div>
                    <div className={"col-lg-4 col-md-12 todo-section"}>
                        <h3 className={"mb-4"}> Assigned Tablet(s) List </h3>
                        <ul className={"list-group"}>
                            {assignedTablets && assignedTablets.map((tabletID) => {
                                return <li key={tabletID} className={"list-group-item"}> <strong>Tablet ID:</strong> {tabletID}
                                    <a href={`/tablet/${tabletID}`} id={"profile-label-btn"} className={"btn btn-secondary align-items-center"}> Label </a> </li>
                            })}
                        </ul>
                    </div>
                </div>
                { userData.role === "Moderator" && <AssignTablet assignedTablets={assignedTablets}/>}
            </div>
        </div>
    )
};

export default ProfilePage;