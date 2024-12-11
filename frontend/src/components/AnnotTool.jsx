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

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const AnnotTool = ({tablet}) => {
    const [showLabel, setShowLabel] = useState(false);
    const [initialData, setInitialData] = useState(tablet.annotations);
    const {user} = useAuthContext();
    
    const saveData = async (annot) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/annotations`, {
            annotations: annot
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        });
    };
    
    const changeStatus = async (status) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    const changeCustomID = async (customID) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/customID`, {
            customID: customID
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    return (
        <div className={"label-tool"} style={{position: "static"}}>
            <PolygonAnnotation
                /* eslint-disable-next-line react/prop-types */
                bgImage={`${baseUrl}/uploads/${tablet.name}`}
                maxPolygons={Infinity}
                polygonStyle={polygonStyle}
                showLabel={true}
                initialPolygons={JSON.stringify(initialData) === "[]" ? undefined : initialData}
            >
                <Toolbar
                    showLabel={true}
                    setShowLabel={setShowLabel}
                    saveData={saveData}
                    changeStatus={changeStatus}
                    changeCustomID={changeCustomID}
                    initialData={JSON.stringify(initialData) === "[]" ? undefined : initialData}
                />
            </PolygonAnnotation>
        </div>
    );
};

export default AnnotTool;