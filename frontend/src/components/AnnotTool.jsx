import {useState} from "react";
import {PolygonAnnotation} from "polygon-annotation";
import Toolbar from "./AnnotToolbar.jsx";
import axios from "axios";

const polygonStyle = {
    vertexRadius: 5,
    lineColor: '#1ea703',
    fillColor: '#37f71139',
    vertexColor: '#ff0000',
};

const AnnotTool = ({ tablet }) => {
    
    const [showLabel, setShowLabel] = useState(false);
    const [initialData, setInitialData] = useState(tablet.annotations);
    
    const saveData = async (annot) => {
        await axios.patch(`http://localhost:4000/tablets/${tablet.id}`, {
            annotations: annot
        });
    };
    
    return (
        <div className={"label-tool"}>
            <PolygonAnnotation
                bgImage={`http://localhost:4000/uploads/${tablet.name}`}
                maxPolygons={Infinity}
                polygonStyle={polygonStyle}
                showLabel={showLabel}
                initialPolygons={JSON.stringify(initialData) === "[]" ? undefined : initialData}
            >
                <Toolbar
                    showLabel={showLabel}
                    setShowLabel={setShowLabel}
                    saveFunc={saveData}
                    />
            </PolygonAnnotation>
        </div>
    );
};

export default AnnotTool;