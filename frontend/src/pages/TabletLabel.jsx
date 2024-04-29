import {useEffect, useState} from "react";
import Canvas from "../containers/Canvas.jsx";
import TabletCards from "../components/TabletCards.jsx";

const TabletLabel = () => {
    
    const [tablets, setTablets] = useState(null)
    
    useEffect(() => {
        const fetchTablets = async () => {
            
            const response = await fetch("http://localhost:4000/tablets/:tabletName")
            const json = await response.json()
            
            if (response.ok) {
                setTablets(json);
            }
        }
        fetchTablets().then()
    }, []);
    
    return(
        <div>
            {tablets && tablets.map((tablets) => (
                <Canvas key={tablets._id} tablets={tablets}/>
            ))}
        </div>
    )
}

export default TabletLabel