import TabletCards from "../components/TabletCards";
import {useEffect, useState} from "react";
import axios from "axios";

const TabletSearch = () => {
    
    const [listOfTablets, setListOfTablets] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:4000/tablets").then((response) => {
            setListOfTablets(response.data);
        });
    }, []);
    
    return (
        <div>
            <div id={"tablets"}>
                {listOfTablets && listOfTablets.map((listOfTablets) => (
                    <TabletCards key={listOfTablets._id} listOfTablets={listOfTablets}/>
                ))}
            </div>
        </div>
    );
}

export default TabletSearch