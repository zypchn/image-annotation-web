/*

##########
DEPRECATED
Reason: Client preferred a method that is not free-hand annotation
Keeping the file for further projects or if they decide otherwise
##########

*/

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
    
    // Patch request to database to saving data
    const saveData = async (annot) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/annotations`, {
            annotations: annot
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        });
    };
    
    // Changing Tablet's status for admin (Moderator) approval
    const changeStatus = async (status) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    return (
        <div className={"label-tool"}>
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
                    initialData={JSON.stringify(initialData) === "[]" ? undefined : initialData}
                />
            </PolygonAnnotation>
        </div>
    );
};

export default AnnotTool;