import {ReactPictureAnnotation} from "react-picture-annotation";
import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext.js";
import axios from "axios";
import CustomInput from "./CustomInput.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const BBoxAnnotTool = ({tablet}) => {
    
    const {user} = useAuthContext();
    
    const languages = ["Hititçe", "Sümerce", "Akadca", "Hurrice", "Luwice", "Hattice", "Palaca"];
    
    const [data, setData] = useState(tablet.annotations);
    const [saveAlert, setSaveAlert] = useState(false);
    const [langs, setLangs] = useState({});
    
    /*
    const [pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    const onResize = () => {
        setPageSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    */
    
    useEffect(() => {
        const preventDefault = (e) => {
            const annotData = document.querySelector('.annot-data');
            if (annotData && (annotData === e.target || annotData.contains(e.target))) {
                return;
            }
            e.preventDefault();
        };
        
        window.addEventListener('wheel', preventDefault, { passive: false });
        
        return () => {
            window.removeEventListener('wheel', preventDefault);
        };
    }, []);
    
    useEffect(() => {
        if(data !== undefined) {
            const tempLangs = {};
            // eslint-disable-next-line react/prop-types
            data.forEach((item) => (
                tempLangs[item.id] = item.lang
            ));
            setLangs(tempLangs);
        }
    }, [data]);
    
    const saveData = async (annot) => {
        const updatedData = annot.map(a => ({
            ...a,
           lang: langs[a.id] || null
        }));
        
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/annotations`, {
            annotations: updatedData
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        });
        setSaveAlert(true);
        setTimeout(() => setSaveAlert(false), 500);
    };
    
    const changeStatus = async (status) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    const onSelect = (selectedId) => {
        if (!selectedId) return;

        // Find the element for the selected annotation
        const selectedElement = document.querySelector(`[data-annotation-id="${selectedId}"]`);
        if (selectedElement) {
            // Scroll the element into view
            selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight effect
            selectedElement.style.backgroundColor = '#fff3cd';
            
            // Remove highlight after a delay
            setTimeout(() => {
                selectedElement.style.backgroundColor = '';
            }, 2000);
        }
    };
    
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
    
    const formatAnnotationData = (data) => {
        if (!data || data.length === 0) return null;
        
        return data.map(annotation => ({
            id: annotation.id,
            label: annotation.comment,
            lang: annotation.lang,
            coordinates: {
                x: annotation.mark.x,
                y: annotation.mark.y,
                width: annotation.mark.width,
                height: annotation.mark.height
            }
        }));
    };
    
    const handleLangChange = (id, lang) => {
        setLangs(prev => ({
            ...prev,
            [id]: lang
        }));

        setData(prevData =>
            prevData.map(item => 
                item.id === id ? {...item, lang:lang} : item
            )
        )
    };
    
    const deleteBox = async (id) => {
        const annotKey = Object.keys(data).find(key => data[key].id === id);
        data.splice(Number(annotKey), 1);
        await saveData(data);
    };
    
    const undo = async () => {
        data.splice(-1, 1);
        await saveData(data);
    };
    
    
    return (
        <div className="bbox-annot">
            <div style={{left: 0, top: 10, display:"flex"}}>
                <ReactPictureAnnotation
                    /* eslint-disable-next-line react/prop-types */
                    image={`${baseUrl}/uploads/${tablet.name}`}
                    onSelect={onSelect}
                    onChange={onChange}
                    width={1300}
                    height={680}
                    scrollSpeed={0.001}
                    annotationData={data}
                    inputElement={(value, onChange, onDelete) => (
                        <CustomInput value={value} onChange={onChange} onDelete={onDelete} onLangChange={handleLangChange} />
                    )}
                />
            </div>
            <div className={"annot-data"} style={{marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start", right:0}}>
                {saveAlert && <p className={"alert alert-success"} style={{ marginLeft: "10px"}}><strong> <i className={"fa-solid fa-check"}></i> </strong></p>}
                <p> Toplam hece sayısı: {data?.length} </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button className={"btn btn-primary"} accessKey={"s"} onClick={() => saveData(data)}>Save</button>
                    <button className={"btn btn-danger"} style={{marginLeft: 5}} onClick={() => undo()}> Undo </button>
                </div>
                <p><strong>------------------------</strong></p>
                <div>
                    {data && formatAnnotationData(data) && formatAnnotationData(data).map((item, index) => (
                        <div key={index} data-annotation-id={item.id} style={{padding: '10px'}}>
                            <p><strong>Label: </strong>{item.label}</p>
                            <p><strong>Lang: </strong>
                                <select
                                    value={langs[item.id] || undefined}
                                    onChange={(e) => {handleLangChange(item.id, e.target.value)}}
                                >
                                    <option value="null">dil seçiniz</option>
                                    {languages && languages.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </p>
                            <button className={"btn btn-danger"} onClick={() => deleteBox(item.id)}> delete </button>
                            <hr/>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    
    );
};
export default BBoxAnnotTool;
