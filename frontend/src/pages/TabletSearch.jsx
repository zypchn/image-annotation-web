import SidebarUpload from "../components/SidebarUpload";
import TabletCards from "../components/TabletCards";
import {useEffect, useState} from "react";

const TabletSearch = () => {
    
    const openNav = () => {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("tablets").style.marginRight = "250px";
    }
    
    const closeNav = () => {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("tablets").style.marginRight = "0";
    }
    
    const [tablets, setTablets] = useState(null)
    
    useEffect(() => {
        const fetchTablets = async () => {
            
            const response = await fetch("http://localhost:4000/tablets")
            const json = await response.json()
            
            if (response.ok) {
                setTablets(json);
            }
        }
        fetchTablets().then()
    }, []);
    
    return (
        <div>
            <div id={"tablets"}>
                {tablets && tablets.map((tablets) => (
                    <TabletCards key={tablets._id} tablets={tablets}/>
                ))}
            </div>
            
            <div id={"sidebar"} className={"sidebar"}>
                <a href={"#"} className={"closeBtn"} onClick={closeNav}> &times; </a>
                <SidebarUpload />
            </div>
            
            <div>
                <button className={"openBtn"} id={"openBtn"} onClick={openNav}>
                    &#9776; Create Tablet
                </button>
            </div>
        </div>
    );
}

export default TabletSearch