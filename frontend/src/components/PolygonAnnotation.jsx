import React from "react";
import { Line, Circle, Group } from "react-konva";

const PolygonAnnotation = ({ points, isComplete }) => {
    const vertexRadius = 6;

    const handlePointDragMove = (e, index) => {
        const updatedPoints = [...points];
        updatedPoints[index] = [e.target.x(), e.target.y()];
    };

    return (
        <Group draggable={!isComplete}>
            <Line
                points={points.flat()}
                stroke="#00F1FF"
                strokeWidth={3}
                closed={isComplete}
                fill={isComplete ? "rgba(140, 30, 255, 0.5)" : null}
            />
            {points.map((point, index) => (
                <Circle
                    key={index}
                    x={point[0]}
                    y={point[1]}
                    radius={vertexRadius}
                    fill="#FF019A"
                    stroke="#00F1FF"
                    strokeWidth={1}
                    draggable={!isComplete}
                    onDragMove={(e) => handlePointDragMove(e, index)}
                />
            ))}
        </Group>
    );
};

export default PolygonAnnotation;
