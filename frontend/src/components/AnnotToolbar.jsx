import { useUndoRedo, useGetPolygons } from "polygon-annotation";
import {useState} from "react";

const Toolbar = ({
    showLabel,
    setShowLabel,
    saveData,
    changeStatus
}) => {
    const { undo, redo, canUndo, canRedo } = useUndoRedo();
    const { polygons, updateLabel } = useGetPolygons();   // TODO redux kullanarak memoization
    const [showAlert, setShowAlert] = useState(false);
    const [statusAlert, setStatusAlert] = useState(false);
    
    let data = polygons;
    
    const saveFunc = () => {
        saveData(data);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
    };
    
    const deletePolygon = async (id) => {
        const annotKey = Object.keys(data).find(key => data[key].id === id);
        data.splice(Number(annotKey), 1);
        await saveData(data);
        location.reload()
        // TODO add another method other than reload
    };
    
    const changeStatusFunc = (status) => {
        changeStatus(status);
        setStatusAlert(true);
        setTimeout(() => setStatusAlert(false), 1000);
    };
    
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
                        onChange={(e) => { updateLabel({ id:p.id, label:e.target.value }) }}
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
                <button onClick={undo} disabled={!canUndo} className={"btn btn-dark"}> Geri Al </button>
                <button onClick={redo} disabled={!canRedo} className={"btn btn-dark"}> Yeniden Yap </button>
            </div>
            
            <div>
                <button accessKey={"s"} disabled={!polygons.length} onClick={() => {saveFunc(data)}}
                className={"btn btn-dark"}> Save Polygons </button>
                <div className={"alert alert-info note-container"}> click <strong>ALT + S</strong> to save </div>
            </div>
            
            {showAlert && <div className={"alert alert-success"}><strong> Saved Successfully! </strong></div>}
            
            <div className={"points-wrapper"}>
                {polygons.map((polygon) => (
                    <div key={polygon.id}>
                        <pre style={{whiteSpace:'pre-wrap'}}>
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
            
            <div className={"status-buttons mx-3"} style={{display: "inline-block"}}>
                <button onClick={() => changeStatusFunc("pending")} id={"pendingBtn"}> Pending </button>
                <button onClick={() => changeStatusFunc("ready to check")} id={"checkBtn"}> Ready To Check </button>
                <button onClick={() => changeStatusFunc("done")} id={"doneBtn"}> Done </button>
                {statusAlert && <div className={"alert alert-success my-2"}><strong> Changed the Status Successfully! </strong></div>}
                
            </div>
        </div>
    );
};

export default Toolbar;