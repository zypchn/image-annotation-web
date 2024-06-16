import TabletCards from "../components/TabletCards";
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const TabletSearch = () => {
    
    const [listOfTablets, setListOfTablets] = useState([]);
    const isSearch = true;
    
    useEffect(() => {
        axios.get("http://localhost:4000/tablets").then((response) => {
            setListOfTablets(response.data);
        });
    }, []);
    
    return (
        <div>
            <Navbar isSearch={isSearch}/>
            <div id={"tablets"}>
                {listOfTablets && listOfTablets.map((listOfTablets) => (
                    <TabletCards key={listOfTablets.id} listOfTablets={listOfTablets}/>
                ))}
            </div>
        </div>
    );
}

export default TabletSearch