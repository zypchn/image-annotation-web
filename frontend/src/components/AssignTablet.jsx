import {useEffect, useState} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line react/prop-types
const AssignTablet = ({assignedTablets}) => {
    
    const [showAlert, setShowAlert] = useState(false);
    
    const [allStudents, setAllStudents] = useState([]);
    const [selectedTablet, setSelectedTablet] = useState();
    const [selectedStudents, setSelectedStudents] = useState([]);
    
    const handleStudentSelect = (e) => {
        const {value, checked} = e.target;
        
        if (checked) {
            setSelectedStudents([...selectedStudents, Number(value)]);
        } else {
            setSelectedStudents(selectedStudents.filter((e) => e !== value));
        }
    };
    
    useEffect(() => {
        axios.get(`${apiUrl}/user/students`)
        .then((response) => {
            setAllStudents(response.data)
        });
    }, []);
    
    const handleAssign = async () => {
        
        await axios.post(`${apiUrl}/user/assign`, {
            userID: selectedStudents,
            tabletID: selectedTablet
        }).then(response => console.log(response))
        .catch(error => console.log(error));
        
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
        
        const studentIDBtn = document.getElementsByClassName("mr-2");
        for (const btn of studentIDBtn) {
            btn.checked = false;
        }
        setSelectedTablet(null);
        setSelectedStudents([]);
    };
    
    return (
        <div className={"d-flex justify-content-center align-items-center mt-4"}>
            <div className={"assign-tablet-container"} style={{display: "inline"}}>
                <h2 className={"my-4"} style={{textAlign: "center"}}> Assign Tablet to Student(s) <button onClick={handleAssign} className={"btn btn-danger"}> Assign </button> </h2>
                {showAlert &&
                    <div className={"alert alert-success my-2"} style={{textAlign: "center"}}><strong> Assigned Successfully! </strong>
                    </div>}
                <div className={"mt-4 mb-2"}>
                    <div className={"row"}>
                        <div className={"col-md-3 col-lg-5"}>
                            <h3 style={{textAlign: "center"}}> Select Tablet </h3>
                            <ul className={"list-group"} style={{height: 300, overflow: "scroll"}}>
                                {/* eslint-disable-next-line react/prop-types */}
                                {assignedTablets && Object.keys(assignedTablets).map(tabletID => (
                                    <li key={tabletID} className={"list-group-item"}>
                                        <input
                                            type={"radio"}
                                            name={"tabletID"}
                                            value={tabletID}
                                            onChange={(e) => setSelectedTablet(e.target.value)}
                                            className={"mr-2"}
                                            style={{marginRight: 7}}
                                        />
                                        <label> Tablet ID: <strong>{assignedTablets[tabletID] ? assignedTablets[tabletID] : tabletID}</strong> </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"col-md-5 col-lg-7"}>
                            <h3 style={{textAlign: "center"}}> Select Student(s) </h3>
                            <ul className={"list-group mb-2"} style={{height: 300, overflow: "scroll"}}>
                                {allStudents && allStudents.map(student => (
                                    <li key={student.id} className={"list-group-item"}>
                                        <input
                                            type={"checkbox"}
                                            name={"studentID"}
                                            value={student.id}
                                            onChange={handleStudentSelect}
                                            className={"mr-2"}
                                            style={{marginRight: 7}}
                                        />
                                        <label> {student.name} </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"col-md-4"}>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTablet;