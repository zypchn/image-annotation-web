import {ReactPictureAnnotation} from "react-picture-annotation";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";
import CustomInput from "./CustomInput.jsx";
import Popup from "reactjs-popup";
import { groupBy } from "core-js/actual/array/group-by";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line react/prop-types
const BBoxAnnotTool = ({tablet}) => {
    
    const {user} = useAuthContext();
    
    // Languages Specifically Defined for Cuneiform Tablets
    const languages = ["Hititçe", "Sümerce", "Akadca", "Hurrice", "Luwice", "Hattice", "Palaca"];
    
    const [data, setData] = useState([]);
    const [saveAlert, setSaveAlert] = useState(false);
    const [langs, setLangs] = useState({});         // Local Storage for Language Data
    const [cols, setCols] = useState({});           // Local Storage for Column Data
    const [rows, setRows] = useState({});           // Local Storage for Row Data
    const [rowSelection, setRowSelection] = useState();         // for Filtering the Toolbar Data
    const [editField, setEditField] = useState(false);
    
    const popupStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        border: '3px solid black',
    }
    
    // Fetching the Annotation Data from DB
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${apiUrl}/annots/${tablet.id}`, {
                headers: {"Authorization": `Bearer ${user.token}`}
            }).then((res) => {
                setData(res.data)
            });
        };
        fetchData().then();
        // eslint-disable-next-line react/prop-types
    }, [tablet.id, user.token]);
    
    // Initializing Local Storages for Annotation Metadata
    useEffect(() => {
        if (data !== undefined) {
            const tempLangs = {};
            const tempCols = {};
            const tempRows = {};
            // eslint-disable-next-line react/prop-types
            data.forEach((item) => {
                tempLangs[item.id] = item.lang
                tempCols[item.id] = item.col_no
                tempRows[item.id] = item.row_no
            });
            setLangs(tempLangs);
            setCols(tempCols);
            setRows(tempRows);
        }
    }, [data]);
    
    // DOM Effect for Toolbar
    useEffect(() => {
        const preventDefault = (e) => {
            const annotData = document.querySelector('.annot-data');
            if (annotData && (annotData === e.target || annotData.contains(e.target))) {
                return;
            }
            e.preventDefault();
        };
        
        window.addEventListener('wheel', preventDefault, {passive: false});
        
        return () => {
            window.removeEventListener('wheel', preventDefault);
        };
    }, []);
    
    // Saving Data to DB
    const saveData = async (annot) => {
        const updatedData = annot.map(a => ({
            ...a,
            lang: langs[a.id] || null,
            col_no: cols[a.id] || null,
            row_no: rows[a.id] || null
        }));
        
        await axios.patch(`${apiUrl}/annots/${tablet.id}`, {
            annotations: updatedData
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        });
        setSaveAlert(true);
        setTimeout(() => setSaveAlert(false), 500);
    };
    
    // TODO : Implement buttons
    // Changing the Status of the Image for Admin Approval
    const changeStatus = async (status) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    // Required Function for the Tool
    // Activating the Toolbar DOM Effect on Select
    const onSelect = (selectedId) => {
        if (!selectedId) return;
        
        const selectedElement = document.querySelector(`[data-annotation-id="${selectedId}"]`);
        if (selectedElement) {
            selectedElement.scrollIntoView({behavior: "smooth", block: "center"});
            
            selectedElement.style.backgroundColor = "#fff3cd";
            
            setTimeout(() => {
                selectedElement.style.backgroundColor = '';
            }, 1000);
        }
    };
    
    // Required Function for the Tool
    // Update Data State on Change of any Annotation Data
    const onChange = (currentData) => {
        setData(prevData => {
            const updatedData = [...prevData];
            
            const newItems = currentData.filter(item =>
                !prevData.some(prevItem => prevItem.id === item.id)
            );
            
            updatedData.push(...newItems);
            
            updatedData.forEach((item, index) => {
                const currentItem = currentData.find(curr => curr.id === item.id);
                if (currentItem) {
                    updatedData[index] = currentItem;
                }
            });
            
            return updatedData;
        });
    };
    
    // Keep Track of the Changes on Language Data
    const handleLangChange = (id, lang) => {
        setLangs(prev => ({
            ...prev,
            [id]: lang
        }));
        
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? {...item, lang: lang} : item
            )
        )
    };
    
    // Keep Track of the Changes on Column Data
    const handleColChange = (id, col_no) => {
        setCols(prev => ({
            ...prev,
            [id]: col_no
        }));
        
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? {...item, col_no: col_no} : item
            )
        )
    };
    
    // Keep Track of the Changes on Row Data
    const handleRowChange = (id, row_no) => {
        setRows(prev => ({
            ...prev,
            [id]: row_no
        }));
        
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? {...item, row_no: row_no} : item
            )
        )
    };
    
    // Delete Request to the DB
    const deleteBox = async (id) => {
        const annotKey = Object.keys(data).find(key => data[key].id === id);
        await axios.delete(`${apiUrl}/annots/${id}`, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
        data.splice(Number(annotKey), 1);
        //await saveData(data);
    };
    
    const undo = async () => {
        /*
        data.splice(-1, 1);
        await saveData(data);
        
         */
        const res = data.groupBy(d => d.col_no);
        console.log(res);
    };
    
    // Main Component
    return (
        <div className={"bbox-annot"}>
            <div style={{left: 10, top: 10, display: "flex"}}>
                <ReactPictureAnnotation
                    /* eslint-disable-next-line react/prop-types */
                    image={`${baseUrl}/uploads/${tablet.name}`}
                    onSelect={onSelect}
                    onChange={onChange}
                    width={1000}
                    height={600}
                    scrollSpeed={0.001}
                    annotationData={data}
                    inputElement={(value, onChange, onDelete) => (
                        <CustomInput value={value} onChange={onChange} onDelete={onDelete}
                                     onLangChange={handleLangChange}/>
                    )}
                />
            </div>
            <div className={"annot-data"}>
                {saveAlert && <p className={"alert alert-success"} style={{marginLeft: "10px"}}><strong>
                    <i className={"fa-solid fa-check"}></i> </strong></p>}
                <div style={{display: "flex", alignItems: "center"}}>
                    <button className={"btn btn-primary"} accessKey={"s"} onClick={() => saveData(data)}>
                        <i className={"fa-regular fa-floppy-disk"}></i> Save
                    </button>
                    
                    <button className={"btn btn-warning"} style={{marginLeft: 5}} onClick={() => undo()}>
                        <i className={"fa-solid fa-rotate-left"}></i> Undo
                    </button>
                    <p style={{margin: 10}}><strong>Toplam hece : </strong> {data?.length} </p>
                </div>
                
                <div className={"coord-data"}>
                    {Object.entries(data.reduce((acc, item) => {
                        const rowKey = item.row_no || 0;
                        if (!acc[rowKey]) {
                            acc[rowKey] = [];
                        }
                        acc[rowKey].push(item);
                        return acc;
                    }, {})).map(([rowKey, items]) => (
                        <div key={rowKey}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                                <p style={{fontSize: 25, marginTop: 10, marginRight: 10, fontWeight: "bold"}}>{rowKey})</p>
                            {items.map((item, index) => (
                                    <div key={index} data-annotation-id={item.id} style={{ padding: '10px', flex: '1 0 30%', display: "inline" }}>
                                        <Popup className={"toolbar-popup"} trigger={<button className={"btn-comment"}>{item.comment}</button>}
                                               position={"bottom left"} contentStyle={popupStyle}>
                                            {close => (
                                                <form className={"annot-form"}>
                                                    <p><strong>Dil : </strong>
                                                        <select
                                                            value={langs[item.id] || undefined}
                                                            onChange={(e) => {
                                                                handleLangChange(item.id, e.target.value)
                                                            }}
                                                        >
                                                            <option value={"null"}>dil seçiniz</option>
                                                            {languages && languages.map((lang) => (
                                                                <option key={lang} value={lang}>{lang}</option>
                                                            ))}
                                                        </select>
                                                    </p>
                                                    
                                                    <p><strong> Satır : </strong>
                                                        <input id={"row-no"} type={"text"} style={{width: 50}}
                                                               value={rows[item.id] || 0}
                                                               onChange={(e) => {
                                                                   handleRowChange(item.id, Number(e.target.value))
                                                               }}/>
                                                    </p>
                                                    
                                                    <p><strong> Sütun : </strong>
                                                        <input id={"col-no"} type={"number"} style={{width: 50}}
                                                               value={cols[item.id] || 0}
                                                               onChange={(e) => {
                                                                   handleColChange(item.id, e.target.value)
                                                               }}/>
                                                    </p>
                                                    
                                                    <button className={"btn btn-danger"} onClick={() => deleteBox(item.id)}>
                                                        <i className={"fa-solid fa-trash-can"}></i> delete
                                                    </button>
                                                    
                                                </form>
                                            )}
                                        </Popup>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default BBoxAnnotTool;