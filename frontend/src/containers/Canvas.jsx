import React, { useState, useRef, useEffect } from "react";
import PolygonAnnotation from "../components/PolygonAnnotation.jsx";
import { Stage, Layer, Image } from "react-konva";
import Button from "../components/Button.jsx";

const videoSource = "src/containers/tablet4.jpeg";

const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "aliceblue",
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "aliceblue",
};

const Canvas = () => {
    const [image, setImage] = useState();
    const imageRef = useRef(null);
    const [polygons, setPolygons] = useState([]); // birden fazla polygon depolamak için state
    const [size, setSize] = useState({});

    useEffect(() => {
        const imageObj = new window.Image();
        imageObj.src = videoSource;
        imageObj.onload = () => {
            setSize({
                width: imageObj.width,
                height: imageObj.height,
            });
            setImage(imageObj);
            imageRef.current.cache();
            imageRef.current.getLayer().batchDraw();
        };
    }, []);

    const handleMouseDown = (e) => {
        const stage = e.target.getStage();
        const mousePos = stage.getPointerPosition();
        const newPolygons = [...polygons];

        if (newPolygons.length === 0 || newPolygons[newPolygons.length - 1].isComplete) {
            newPolygons.push({
                points: [mousePos.x, mousePos.y],
                isComplete: false,
            });
            setPolygons(newPolygons);
        } else {
            const lastPolygon = newPolygons[newPolygons.length - 1];
            lastPolygon.points = [...lastPolygon.points, mousePos.x, mousePos.y];
            setPolygons([...newPolygons]);
        }
    };

    const handleFinishPolygon = () => {
        const lastPolygon = polygons[polygons.length - 1];
        lastPolygon.isComplete = true;
        setPolygons([...polygons]);
    };

    const handleUndo = () => {
        const newPolygons = [...polygons];
        if (newPolygons.length > 0 && !newPolygons[newPolygons.length - 1].isComplete) {
            const lastPolygon = newPolygons[newPolygons.length - 1];
            lastPolygon.points.pop();
            if (lastPolygon.points.length === 0) {
                newPolygons.pop();
            }
            setPolygons(newPolygons);
        }
    };

    const handleReset = () => {
        setPolygons([]);
    };

    const handleRemoveLastPolygon = () => {
        if (polygons.length > 0) {
            const newPolygons = [...polygons];
            newPolygons.pop(); // Remove the last polygon
            setPolygons(newPolygons);
        }
    };

    return (
        <div style={wrapperStyle}>
            <div style={columnStyle}>
                <Stage
                    width={size.width || 650}
                    height={size.height || 500}
                    onMouseDown={handleMouseDown}
                >
                    <Layer>
                        <Image
                            ref={imageRef}
                            image={image}
                            width={size.width}
                            height={size.height}
                        />
                        {polygons.map((polygon, index) => (
                            <PolygonAnnotation
                                key={index}
                                points={polygon.points}
                                isComplete={polygon.isComplete}
                            />
                        ))}
                    </Layer>
                </Stage>
                <div style={{ marginTop: 10 }}>
                    <Button name="Polygonu Bitir" onClick={handleFinishPolygon} />
                    <Button name="Geri Al" onClick={handleUndo} />
                    <Button name="Hepsini Sıfırla" onClick={handleReset} />
                    <Button name="Bir Önceki Poligonu Sil" onClick={handleRemoveLastPolygon} />
                </div>
            </div>
            <div style={{ marginLeft: 20, maxWidth: 300 }}>
                <h3>Polygon Koordinatları:</h3> 
                <pre>{JSON.stringify(polygons, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Canvas;
