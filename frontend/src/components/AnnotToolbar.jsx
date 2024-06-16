import React, {useState} from "react";
import { useUndoRedo, useGetPolygons } from "polygon-annotation";

const Toolbar = ({
    showLabel,
    setShowLabel,
    saveFunc
}) => {
    const { undo, redo, canUndo, canRedo } = useUndoRedo();
    const { polygons, updateLabel, deletePolygons } = useGetPolygons();   // TODO redux kullanarak memoization
    
    const [focusedField, setFocusedField] = useState(null);
    const [label, setLabel] = useState("");
    const addCustomChar = (e, field) => {
        const clickedChar = e.target.innerText;
        field.value += clickedChar;
        updateLabel({id: field.id, label: field.value});
        console.log((field.value));
    }
    
    let data = polygons;
    
    const deletePolygon = (id) => {
        const annotKey = Object.keys(data).find(key => data[key].id === id);
        data.splice(Number(annotKey), 1);
        saveFunc(data);
        location.reload();
        // TODO add another method other than reload
    }
    
    return (
        <div className={"toolbar-wrapper"}>
            <div>
                <label htmlFor={"showLabel"} style={{fontSize: 20}}> Show Labels: </label>
                <input id={"showLabel"} type={"checkbox"}
                       onChange={(e) => setShowLabel(e.target.checked)} />
            </div>
            
            {showLabel && polygons.map((p) => (
                <div key={p.id}>
                    <label htmlFor={`label-${p.id}`}> Label </label>
                    <input
                        id={`label-${p.id}`}
                        type={"text"}
                        placeholder={"hece adı"}
                        value={p.label}
                        onChange={(e) => {
                            updateLabel({ id:p.id, label:e.target.value });
                        }}
                        onClick={(e) => {setFocusedField(e.target)}}
                    />
                    <table>
                        <tbody>
                        <tr onClick={(e) => {
                            const textField = document.getElementById(`label-${p.id}`);
                            textField.value += e.target.innerText;
                            updateLabel({id: p.id, label:textField.value})
                        }}>
                            <td className="accent-cell">Á</td>
                            <td className="accent-cell">á</td>
                            <td className="accent-cell">à</td>
                            <td className="accent-cell">É</td>
                            <td className="accent-cell">é</td>
                            <td className="accent-cell">Ì</td>
                            <td className="accent-cell">Í</td>
                            <td className="accent-cell">ì</td>
                            <td className="accent-cell">í</td>
                            <td className="accent-cell">Ú</td>
                            <td className="accent-cell">Ù</td>
                            <td className="accent-cell">ú</td>
                            <td className="accent-cell">Š</td>
                            <td className="accent-cell">š</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            
            <div>
                <button onClick={undo} disabled={!canUndo}> Geri Al </button>
                <button onClick={redo} disabled={!canRedo}> Yeniden Yap </button>
            </div>
            
            <div>
                <button disabled={!polygons.length} onClick={() => {saveFunc(data)}}> Save Polygons </button>
            </div>
            
            <div className={"points-wrapper"}>
                {polygons.map((polygon) => (
                    <div key={polygon.id}>
                        <pre style={{ whiteSpace:'pre-wrap' }}>
                            label: {JSON.stringify(polygon.label)}
                            <button className={"labelDeleteBtn"}
                                    onClick={() => {
                                        window.confirm(`${polygon.label} silinecektir`) && deletePolygon(polygon.id)}}> <i className="fa-regular fa-trash-can"></i> delete </button>
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