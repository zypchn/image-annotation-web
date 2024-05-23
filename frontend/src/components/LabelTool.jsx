import {useState} from "react";
import { PolygonAnnotation } from "polygon-annotation";
import Toolbar from "./LabelToolbar.jsx";

import img from "./tablet1.jpeg";

const polygonStyle = {
    vertexRadius: 5,
    lineColor: '#1ea703',
    fillColor: '#37f71139',
    vertexColor: '#ff0000',
};
const initialData = [
    {
        label: 'planet',
        points: [
            [456.5, 53],
            [442.5, 102],
            [477.5, 165],
            [536.5, 176],
            [593.5, 132],
            [593.5, 71],
            [560.5, 29],
            [517.5, 25],
        ],
    },
];
const LabelTool = () => {
    
    const [showLabel, setShowLabel] = useState(false);

    return (
        <div className={"label-tool"}>
            <PolygonAnnotation
                bgImage={img}
                maxPolygons={Infinity}
                polygonStyle={polygonStyle}
                showLabel={showLabel}
                //initialPolygons={initialData}
            >
                <Toolbar
                    showLabel={showLabel}
                    setShowLabel={setShowLabel}
                    />
            </PolygonAnnotation>
        </div>
    );
};

export default LabelTool;