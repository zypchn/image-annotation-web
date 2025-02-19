import {ReactPictureAnnotation} from "react-picture-annotation";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";
import CustomInput from "./CustomInput.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line react/prop-types
const BBoxAnnotTool = ({tablet}) => {
    
    const {user} = useAuthContext();
    
    const [data, setData] = useState([]);
    const [saveAlert, setSaveAlert] = useState(false);
    const [langs, setLangs] = useState({});         // Local Storage for Language Data
    const [cols, setCols] = useState({});           // Local Storage for Column Data
    const [rows, setRows] = useState({});           // Local Storage for Row Data
    const [comments, setComments] = useState({});   // Local Storage for Label Data
    const [selectedId, setSelectedId] = useState(null);
    
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
                setData(res.data);
            });
        };
        
        fetchData().then();
        // eslint-disable-next-line react/prop-types
    }, [tablet.id, user.token]);
    
    
    // Initializing Local Storages for Annotation Metadata
    useEffect(() => {
        if (data !== undefined) {
            // eslint-disable-next-line react/prop-types
            data.forEach((item) => {
                setComments(prev => ({...prev, [item.id]: item.comment}));
                setLangs(prev => ({...prev, [item.id]: item.lang || ""}));
                setRows(prev => ({...prev, [item.id]: item.row_no || 0}));
                setCols(prev => ({...prev, [item.id]: item.col_no || 0}));
            });
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
            comment: comments[a.id],
            lang: langs[a.id],
            col_no: cols[a.id],
            row_no: rows[a.id],
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
        if (!selectedId)
            return;
        
        const selectedElement = document.querySelector(`[data-annotation-id="${selectedId}"]`);
        if (selectedElement) {
            
            selectedElement.scrollIntoView({behavior: 'smooth', block: 'center'});
            
            selectedElement.style.backgroundColor = '#fff3cd';
            
            setTimeout(() => {
                selectedElement.style.backgroundColor = '';
            }, 2000);
        }
        setSelectedId(selectedId);
        return selectedId;
    };
    
    // Required Function for the Tool
    // Update Data State on Change of any Annotation Data Except Text (Comment)
    const onChangeAll = (currentData) => {
        setData(prevData => {
            const prevMap = new Map(prevData.map(item => [item.id, item]));
            
            currentData.forEach(item => {
                const updatedItem = {
                    ...item,
                    comment: comments[item.id] ?? item.comment,
                    lang: langs[item.id] ?? item.lang,
                    col_no: cols[item.id] ?? item.col_no,
                    row_no: rows[item.id] ?? item.row_no
                };
                prevMap.set(item.id, updatedItem);
            });
            
            return Array.from(prevMap.values());
        });
    };
    
    // Keep Track of the Changes on Language Data
    const handleLangChange = (id, lang) => {
        try {
            setLangs(prev => ({...prev, [id]: lang}));
            
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? {...item, lang} : item
                )
            );
        } catch (error) {
            console.error("Error in handleLangChange:", error);
        }
    };
    
    // Keep Track of the Changes on Column Data
    const handleColChange = (id, col_no) => {
        try {
            setCols(prev => ({...prev, [id]: col_no}));
            
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? {...item, col_no} : item
                )
            );
        } catch (error) {
            console.error("Error in handleColChange:", error);
        }
    };
    
    // Keep Track of the Changes on Row Data
    const handleRowChange = (id, row_no) => {
        try {
            setRows(prev => ({...prev, [id]: row_no}));
            
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? {...item, row_no} : item
                )
            );
        } catch (error) {
            console.error("Error in handleRowChange:", error);
        }
    };
    
    // Keep Track of the Changes on Label (Comment) Data
    const handleCommentChange = (id, comment) => {
        setComments(prev => ({
            ...prev,
            [id]: comment
        }));
        
        setData(prevData => prevData.map(item =>
            item.id === id ? {...item, comment: comment} : item
        ));
    };
    
    // Delete Request to the DB
    const handleDelete = async (id) => {
        setData(prevData => prevData.filter(item => item.id !== id));
        await axios.delete(`${apiUrl}/annots/${id}`, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    const undo = async () => {
        const lastIdx = data.length - 1;
        const lastAnnotId = data[lastIdx].id;
        setData(prevData => prevData.filter(item => item.id !== lastAnnotId));
        await handleDelete(lastAnnotId);
    };
    
    // Main Component
    return (
        <div className={"bbox-annot"}>
            <div className={"react-picture-annotation"}>
                <ReactPictureAnnotation
                    /* eslint-disable-next-line react/prop-types */
                    image={`${baseUrl}/uploads/${tablet.name}`}
                    onSelect={onSelect}
                    onChange={onChangeAll}
                    width={1000}
                    height={600}
                    scrollSpeed={0.001}
                    annotationData={data}
                    inputElement={() => (
                        <CustomInput comments={comments} onTextChange={handleCommentChange} selectedId={selectedId}
                                     langs={langs} onLanguageChange={handleLangChange}
                                     rows={rows} onRowChange={handleRowChange}
                                     cols={cols} onColChange={handleColChange} onDelete={handleDelete}/>
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
                    <button className={"btn btn-secondary"} style={{marginLeft: 5}} onClick={() => undo()}>
                        <i className={"fa-solid fa-rotate-left"}></i> Undo
                    </button>
                    <h5 style={{margin: 10}}><strong>Toplam hece : </strong> {data?.length} </h5>
                </div>
                <div style={{alignItems: "center"}}>
                    <button className={"btn btn-danger"}>Pending</button>
                    <button className={"btn btn-warning"}>Ready to Check</button>
                    <button className={"btn btn-success"}>Done</button>
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
                            <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
                                <p className={"p-rowkey"}>{rowKey}) </p>
                                {items.map((item, index) => (
                                    <div key={index} data-annotation-id={item.id}
                                         style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                                        <p className={"p-comment"}> {item.comment} </p>
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