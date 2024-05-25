import React, {useEffect} from "react";
import { useUndoRedo, useGetPolygons } from "polygon-annotation";

const Toolbar = ({
    showLabel,
    setShowLabel,
    saveFunc
}) => {
    const { undo, redo, canUndo, canRedo } = useUndoRedo();
    const { polygons, updateLabel, deletePolygons } = useGetPolygons();   // TODO redux kullanarak memoization
    
    // TODO exportData download yerine database güncelleme işlevi
    
    const data = polygons;
    
    return (
        <div className={"toolbar-wrapper"}>
            <div>
                <label htmlFor={"showLabel"}> Show Labels: </label>
                <input id={"showLabel"} type={"checkbox"}
                       onChange={(e) => setShowLabel(e.target.checked)} />
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
                <button disabled={!polygons.length} onClick={() => {saveFunc(data)}}> Save Polygons </button>
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
            
            <div className={"status-buttons"} style={{display: "inline-block"}}>
                <div style={{marginBottom: 30}}>
                    <label htmlFor={"labelDone"}><b> Label İşlemi Tamamlandı: &ensp; </b></label>
                    <input id={"labelDone"} type={"checkbox"} />
                </div>
  
                <div>
                    <label htmlFor={"checked"}><b> Kontrol Edildi: &ensp; </b></label>
                    <input id={"checked"} type={"checkbox"} />
                </div>
            </div>
            
        </div>
    );
};

export default Toolbar;