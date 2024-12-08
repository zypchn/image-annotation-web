import {useGetPolygons, useUndoRedo} from "polygon-annotation";
import {useEffect, useState} from "react";

const Toolbar = ({
                     showLabel,
                     setShowLabel,
                     saveData,
                     changeStatus,
                     changeCustomID,
                     initialData
                 }) => {
    const {undo, redo, canUndo, canRedo} = useUndoRedo();
    const {polygons, updateLabel} = useGetPolygons();   // TODO memoization using redux
    const [showAlert, setShowAlert] = useState(false);
    const [statusAlert, setStatusAlert] = useState(false);
    const [nameAlert, setNameAlert] = useState(false);
    const [langs, setLangs] = useState({});
    
    let data = polygons;
    
    const CUSTOM_CHARS = ["ṷ", "Ṷ", "ḫ", "Ḫ", "ṣ", "Ṣ", "š", "Š", "á", "Á", "à", "Á", "é", "É", "è", "È", "í",
        "Í", "ì", "Ì", "ú", "Ú", "ù", "Ù"];
    const SPECIAL_TOKENS = ["<EOL>", "<BOP>", "<EOP>", "<SSEP>", "<WSEP>", "<PRED>", "<POSTD>"];
    const languages = ["Hititçe", "Sümerce", "Akadca"];
    
    const halfLength = Math.ceil(CUSTOM_CHARS.length / 2);
    const firstRow = CUSTOM_CHARS.slice(0, halfLength);
    const secondRow = CUSTOM_CHARS.slice(halfLength);
    
    const saveFunc = () => {
        const updatedData = polygons.map(polygon => ({
            ...polygon,
            lang: langs[polygon.id] || null
        }));
        saveData(updatedData);
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
    
    const changeCustomIDFunc = (name) => {
        changeCustomID(name);
        setNameAlert(true);
        setTimeout(() => setNameAlert(false), 1000);
    }
    
    const scroll = (direction) => {
        const konvaContainer = document.querySelector('.konvajs-content');
        if (!konvaContainer) return;
        
        const currentLeft = parseInt(konvaContainer.style.left || '0');
        const currentTop = parseInt(konvaContainer.style.top || '0');
        const scrollAmount = 100;
        
        switch (direction) {
            case "left":
                konvaContainer.style.left = `${currentLeft + scrollAmount}px`;
                break;
            case "right":
                konvaContainer.style.left = `${currentLeft - scrollAmount}px`;
                break;
            case "up":
                konvaContainer.style.top = `${currentTop + scrollAmount}px`;
                break;
            case "down":
                konvaContainer.style.top = `${currentTop - scrollAmount}px`;
                break;
        }
        konvaContainer.style.transition = "left 0.3s, top 0.3s";
        konvaContainer.style.position = "absolute";
    }
    
    const handleLangChange = (polygonID, lang) => {
        setLangs(prev => ({
            ...prev,
            [polygonID]: lang
        }));
    };
    
    useEffect(() => {
        if(initialData !== undefined) {
            const tempLangs = {};
            // eslint-disable-next-line react/prop-types
            initialData.forEach((item) => (
                tempLangs[item.id] = item.lang
            ));
            setLangs(tempLangs);
        }
    }, [initialData]);
    
    useEffect(() => {
        const container = document.querySelector('.konvajs-content').parentElement;
        if (container) {
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
            container.style.width = '1000px';
            container.style.height = '600px';
        }
    }, []);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Delete" && canUndo) {
                event.preventDefault();
                undo();
            } else if (event.key === "Enter" && canRedo) {
                event.preventDefault();
                redo();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                scroll("up");
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                scroll("down")
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                scroll("left")
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scroll("right")
            }
        };
        
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [canRedo, canUndo, redo, undo]);
    
    return (
        <div className={"toolbar-wrapper"}>
            
            <div className={"textField-wrapper"} style={{width: 475}}>
                {showLabel && polygons.map((p, index) => (
                    <div key={p.id}>
                        <label htmlFor={`label-${p.id}`} id={"label-idx"}> <b>{index + 1})</b> &nbsp; </label>
                        <input
                            className={"inputField"}
                            id={`label-${p.id}`}
                            type={"text"}
                            placeholder={"hece adı"}
                            value={p.label}
                            onChange={(e) => {
                                updateLabel({id: p.id, label: e.target.value})
                            }}
                        />
                        
                        &nbsp; &nbsp;
                        
                        <div className={"lang-selection"}>
                            {languages.map(lang => (
                                <label key={lang} className={"mx-2"}>
                                    <input
                                        type={"radio"}
                                        name={`lang-${p.id}`}
                                        value={lang}
                                        checked={langs[p.id] === lang}
                                        onChange={() => handleLangChange(p.id, lang)}/>
                                    <span className={"ml-1"}>{lang}</span>
                                    
                                </label>
                            ))}
                        </div>
                        
                        <table className={"custom-char-table"}>
                            <tbody>
                            <tr
                                onClick={(e) => {
                                    const textField = document.getElementById(`label-${p.id}`);
                                    textField.value += e.target.innerText;
                                    updateLabel({id: p.id, label: textField.value});
                                }}
                            >
                                {firstRow.map((char, index) => (
                                    <td key={`row1-custom-char-${index}`} className="accent-cell">
                                        {char}
                                    </td>
                                ))}
                            </tr>
                            <tr
                                onClick={(e) => {
                                    const textField = document.getElementById(`label-${p.id}`);
                                    textField.value += e.target.innerText;
                                    updateLabel({id: p.id, label: textField.value});
                                }}
                            >
                                {secondRow.map((char, index) => (
                                    <td key={`row2-custom-char-${index}`} className="accent-cell">
                                        {char}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                        
                        <table>
                            <tbody>
                            <tr
                                onClick={(e) => {
                                    const textField = document.getElementById(`label-${p.id}`);
                                    textField.value += e.target.innerText;
                                    updateLabel({id: p.id, label: textField.value});
                                }}
                            >
                                {SPECIAL_TOKENS.map((char, index) => (
                                    <td key={`row1-custom-char-${index}`} className="accent-cell">
                                        {char}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                    </div>
                ))}
            </div>
            
            <br/>
            
            <div className={"scroll-buttons mx-3"} style={{display: "inline-block"}}>
                <button onClick={() => scroll("up")} className={"btn btn-primary"}><i
                    className="fa-solid fa-arrow-up"></i> Up
                </button>
                <button onClick={() => scroll("down")} className={"btn btn-primary"}><i
                    className="fa-solid fa-arrow-down"></i> Down
                </button>
                <button onClick={() => scroll("left")} className={"btn btn-primary"}><i
                    className="fa-solid fa-arrow-left"></i> Left
                </button>
                <button onClick={() => scroll("right")} className={"btn btn-primary"}><i
                    className="fa-solid fa-arrow-right"></i> Right
                </button>
            </div>
            
            <div>
                <button onClick={undo} disabled={!canUndo} className={"btn btn-dark"}> Geri Al</button>
                <button onClick={redo} disabled={!canRedo} className={"btn btn-dark"}> Yeniden Yap</button>
                <button accessKey={"s"} disabled={!polygons.length} onClick={() => {saveFunc(data)}}
                        className={"btn btn-dark"}> Save Polygons
                </button>
                <button>hey</button>
            </div>
            
            {showAlert && <div className={"alert alert-success"}><strong> Saved Successfully! </strong></div>}
            
            <div className={"points-wrapper"}>
                {polygons.map((polygon) => (
                    <div key={polygon.id}>
                        <pre style={{whiteSpace: 'pre-wrap'}}>
                            label: {JSON.stringify(polygon.label)}
                            <button className={"labelDeleteBtn"}
                                    onClick={() => {
                                        window.confirm(`${polygon.label} silinecektir`) && deletePolygon(polygon.id)
                                    }}> <i className="fa-regular fa-trash-can"></i> delete </button>
                            <br/>
                            language: {langs[polygon.id]}
                            <br/>
                            points: {JSON.stringify(polygon.points)}
                        </pre>
                    </div>
                ))}
            </div>
            
            <div className={"status-buttons mx-3"} style={{display: "inline-block"}}>
                <button onClick={() => changeStatusFunc("pending")} className={"btn btn-danger"}
                        id={"pendingBtn"}> Pending
                </button>
                <button onClick={() => changeStatusFunc("ready to check")} id={"checkBtn"}
                        className={"btn btn-warning"}> Ready To Check
                </button>
                <button onClick={() => changeStatusFunc("done")} id={"doneBtn"} className={"btn btn-success"}> Done
                </button>
                {statusAlert &&
                    <div className={"alert alert-success my-2"}><strong> Status Changed Successfully! </strong></div>}
            </div>
            
            <br/>
            
            <div>
                <input type={"text"} id={"changeCustomIDField"} style={{display: "inline-block"}}/>
                <button style={{border: "none"}} onClick={() => {
                    const customID = document.getElementById("changeCustomIDField").value;
                    changeCustomIDFunc(customID);
                }}> Change ID </button>
                {nameAlert && <div className={"alert alert-success my-2"}><strong> Tablet Name Changed Successfully! </strong></div>}
            </div>
        
        </div>
    );
};

export default Toolbar;