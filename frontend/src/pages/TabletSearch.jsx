import TabletCards from "../components/TabletCards";
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const TabletSearch = () => {
    
    const [listOfTablets, setListOfTablets] = useState([]);
    const {user} = useAuthContext();
    
    useEffect(() => {
        if (user) {
            axios.get(`${apiUrl}/tablets`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            }).then((response) => {setListOfTablets(response.data)});
        }
    }, [user]);
    
    return (
        <div>
            <Navbar/>
            <div id={"tablets"}>
                {listOfTablets && listOfTablets.map((listOfTablets) => (
                    <TabletCards key={listOfTablets.id} listOfTablets={listOfTablets}/>
                ))}
            </div>
        </div>
    );
}

export default TabletSearch