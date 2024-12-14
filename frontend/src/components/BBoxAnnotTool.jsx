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
            e.preventDefault();
        };
        
        window.addEventListener('wheel', preventDefault, { passive: false });
        
        return () => {
            window.removeEventListener('wheel', preventDefault);
        };
    }, []);
    
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
    };
    
    const changeStatus = async (status) => {
        await axios.patch(`${apiUrl}/tablets/${tablet.id}/status`, {
            status: status
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
    
    const onSelect = (selectedID) => {
        return;
    };
    
    const onChange = (currentData) => {
        setData(currentData);
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
                <p> Toplam hece sayısı: {data?.length} </p>
                <button className={"btn btn-primary"} onClick={() => saveData(data)}>Save</button>
                <hr style={{border: "2px solid black"}}/>
                <div>
                    {data && formatAnnotationData(data) && formatAnnotationData(data).map((item, index) => (
                        <div key={index}>
                            <p><strong>Label: </strong>{item.label}</p>
                            <p><strong>Lang: </strong>
                                <select
                                    value={langs[item.id] || null}
                                    onChange={(e) => {handleLangChange(item.id, e.target.value)}}
                                >
                                    <option value="null">dil seçiniz</option>
                                    {languages && languages.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </p>
                            {/*
                            <p><strong>Coordinates:</strong> x:{item.coordinates.x},
                                y:{item.coordinates.y},
                                width:{item.coordinates.width},
                                height:{item.coordinates.height}
                            </p>
                            */}
                            <hr/>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    
    );
};
export default BBoxAnnotTool;
