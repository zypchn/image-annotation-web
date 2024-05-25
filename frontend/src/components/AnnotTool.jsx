import {useState} from "react";
import {PolygonAnnotation, useGetPolygons} from "polygon-annotation";
import Toolbar from "./AnnotToolbar.jsx";
import tab from "bootstrap/js/src/tab.js";

const polygonStyle = {
    vertexRadius: 5,
    lineColor: '#1ea703',
    fillColor: '#37f71139',
    vertexColor: '#ff0000',
};

// TODO useState kullanarak initialData setInıtialData
// her save alındığında initialData değişicek

const AnnotTool = ({ tablet }) => {
    
    const [showLabel, setShowLabel] = useState(false);
    const [initialData, setInitialData] = useState(tablet.annotations);
    
    return (
        <div className={"label-tool"}>
            <PolygonAnnotation
                bgImage={"http://localhost:4000/uploads/" + tablet.name}
                maxPolygons={Infinity}
                polygonStyle={polygonStyle}
                showLabel={showLabel}
                initialPolygons={initialData === null ? initialData : undefined}
            >
                <Toolbar
                    showLabel={showLabel}
                    setShowLabel={setShowLabel}
                    />
                
            </PolygonAnnotation>
        </div>
    );
};

export default AnnotTool;