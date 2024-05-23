import React from "react";
import { useUndoRedo, useGetPolygons } from "polygon-annotation";

const Toolbar = ({
    maxPolygons,
    showLabel,
    setMaxPolygons,
    setShowLabel,
    config,
    setConfig
}) => {
    const { undo, redo, canUndo, canRedo } = useUndoRedo();
    const { polygons, updateLabel, deletePolygons } = useGetPolygons();   // TODO redux kullanarak memoization
    
    const exportData = () => {
        const data = JSON.stringify(polygons);
        const blob = new Blob([data], { type:"text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "polygon-data.json";
        a.click();
        URL.revokeObjectURL(url);
    };
    
    return (
        <div className={"toolbar-wrapper"}>
            <div>
                <label htmlFor={"showLabel"}> Show Labels: </label>
                <input
                    id={"showLabel"}
                    type={"checkbox"}
                    onChange={(e) => setShowLabel(e.target.checked)}
                />
            </div>
            
            {showLabel && polygons.map((p) => (
                <div key={p.id}>
                    <label htmlFor={`label-${p.id}`}> Label </label>
                    <input
                        id={`label-${p.id}`}
                        type={"text"}
                        placeholder={"enter a value"}
                        value={p.label}
                        onChange={(e) => {
                            updateLabel({ id:p.id, label:e.target.value });
                        }}
                    />
                </div>
            ))}
            
            <div>
                <button onClick={undo} disabled={!canUndo}> Geri Al </button>
                <button onClick={redo} disabled={!canRedo}> Yeniden Yap </button>
                <button onClick={deletePolygons} disabled={!canUndo}> Hepsini Sil </button>
            </div>
            
            <div>
                <button disabled={!polygons.length} onClick={exportData}> Export Data </button>
            </div>
            
            <div className={"points-wrapper"}>
                {polygons.map((polygon) => (
                    <div key={polygon.id}>
                        <pre style={{ whiteSpace:'pre-wrap' }}>
                            label: {JSON.stringify(polygon.label)}
                            <br/>
                            points: {JSON.stringify(polygon.points)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Toolbar;