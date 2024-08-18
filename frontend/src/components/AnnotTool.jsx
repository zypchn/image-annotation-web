import {useState} from "react";
import {PolygonAnnotation} from "polygon-annotation";
import Toolbar from "./AnnotToolbar.jsx";
import axios from "axios";
import {useAuthContext} from "../hooks/useAuthContext.js";

const polygonStyle = {
    vertexRadius: 5,
    lineColor: '#1ea703',
    fillColor: '#37f71139',
    vertexColor: '#ff0000',
};

// eslint-disable-next-line react/prop-types
const AnnotTool = ({ tablet }) => {
    
    const [showLabel, setShowLabel] = useState(false);
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const [initialData, setInitialData] = useState(tablet.annotations);
    const {user} = useAuthContext();
    
    const saveData = async (annot) => {
        // eslint-disable-next-line react/prop-types
        await axios.patch(`http://localhost:4000/tablets/${tablet.id}/annotations`, {
            annotations: annot
        }, {
            headers: { "Authorization": `Bearer ${user.token}` }
        });
    };
    
    const changeStatus = async (status) => {
        // eslint-disable-next-line react/prop-types
        await axios.patch(`http://localhost:4000/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: { "Authorization": `Bearer ${user.token}` }
        }).then().catch();
    };
    
    return (
        <div className={"label-tool"} style={{position: "absolute"}}>
                <PolygonAnnotation
                    /* eslint-disable-next-line react/prop-types */
                    bgImage={`http://localhost:4000/uploads/${tablet.name}`}
                    maxPolygons={Infinity}
                    polygonStyle={polygonStyle}
                    showLabel={showLabel}
                    initialPolygons={JSON.stringify(initialData) === "[]" ? undefined : initialData}
                >
                <Toolbar
                    showLabel={showLabel}
                    setShowLabel={setShowLabel}
                    saveData={saveData}
                    changeStatus={changeStatus}
                />
            </PolygonAnnotation>
        </div>
    );
};

export default AnnotTool;