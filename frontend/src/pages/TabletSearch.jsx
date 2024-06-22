import TabletCards from "../components/TabletCards";
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";

const TabletSearch = () => {
    
    const [listOfTablets, setListOfTablets] = useState([]);
    const {user} = useAuthContext();
    
    useEffect(() => {
        if (user) {
            axios.get("http://localhost:4000/tablets", {
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