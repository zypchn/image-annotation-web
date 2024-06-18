import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";

const ProfilePage = () => {
    
    const [userData, setUserData] = useState({});
    const {user} = useAuthContext();
    const id = user.userID;
    
    useEffect(() => {
            axios.get(`http://localhost:4000/user/${id}`)
            .then((response) => {setUserData(response.data)});
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
                            <label><strong>Email</strong></label>
                            <p id={"email"}> {userData.email} </p>
                        </div>
                        <div className={"mb-3"}>
                            <label> <strong>Role</strong></label>
                            <p id={"role"}> {userData.role} </p>
                        </div>
                    </div>
                    <div className={"col-lg-4 col-md-12 todo-section"}>
                        <h3 className={"mb-4"}> Assigned Tablets List </h3>
                        <ul className={"list-group"}>
                            <li className={"list-group-item"}> tablet 1</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage;