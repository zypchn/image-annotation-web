import {useState} from "react";
import { PolygonAnnotation } from "polygon-annotation";
import Toolbar from "../components/AnnotToolbar.jsx";
import {useParams} from "react-router-dom";

const polygonStyle = {
    vertexRadius: 5,
    lineColor: '#1ea703',
    fillColor: '#37f71139',
    vertexColor: '#ff0000',
};
const initialData = [];
// TODO useState kullanarak initialData setInıtialData
// her save alındığında initialData değişicek

const AnnotPage = ({ listOfTablets }) => {
    
    const { name } = useParams();
    const [showLabel, setShowLabel] = useState(false);

    return (
        <div className={"label-tool"}>
            <PolygonAnnotation
                bgImage={"http://localhost:4000/uploads/" + name}
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

export default AnnotPage;