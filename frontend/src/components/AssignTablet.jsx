import {useEffect, useState} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line react/prop-types
const AssignTablet = ({assignedTablets}) => {
    
    const [showAlert, setShowAlert] = useState(false);
    
    const [allStudents, setAllStudents] = useState([]);
    const [selectedTablet, setSelectedTablet] = useState();
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [deletedTablet, setDeletedTablet] = useState();
    const [assignedStudentID, setAssignedStudentID] = useState(null);
    const [assignedTabletsDelete, setAssignedTabletsDelete] = useState({});
    
    useEffect(() => {
        axios.get(`${apiUrl}/user/students`)
        .then((response) => {
            setAllStudents(response.data)
        });
    }, []);
    
    useEffect(() => {
        axios.get(`${apiUrl}/user/${assignedStudentID}/assigned`)
        .then((response) => {
            setAssignedTabletsDelete(response.data);
        }).catch((error) => console.log(error));
        
    }, [assignedStudentID, assignedTabletsDelete]);
    
    const handleStudentSelect = (e) => {
        const {value, checked} = e.target;
        
        if (checked) {
            setSelectedStudents([...selectedStudents, Number(value)]);
        } else {
            setSelectedStudents(selectedStudents.filter((e) => e !== value));
        }
    };
    
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
    
    const handleDelete = async (userID, tabletID) => {
        await axios.post(`${apiUrl}/user/removeAssignation`, {
            userID: userID,
            tabletID: tabletID
        }).then(response => console.log(response))
        .catch(error => console.log(error));
        
        setDeletedTablet(null);
    };
    
    const getAssignedTablets = async (userID) => {
        
        if (userID === null) {
            setAssignedTabletsDelete([]);
            return;
        }
        
        await axios.get(`${apiUrl}/user/${userID}/assigned`)
        .then((response) => {
            setAssignedTabletsDelete(response.data);
            console.log(assignedTabletsDelete);
        });
    };
    
    return (
        <div className={"d-flex justify-content-center align-items-center mt-4"}>
            <div className={"assign-tablet-container"} style={{display: "inline"}}>
                <h2 className={"my-4"} style={{textAlign: "center"}}> Assign Tablet to Student(s) <button
                    onClick={handleAssign} className={"btn btn-danger"}> Assign </button></h2>
                {showAlert &&
                    <div className={"alert alert-success my-2"} style={{textAlign: "center"}}><strong> Assigned
                        Successfully! </strong>
                    </div>}
                <div className={"mt-4 mb-2"}>
                    <div className={"row"}>
                        <div className={"col-md-3 col-lg-3"}>
                            <h3 style={{textAlign: "center"}}> Select Tablet </h3>
                            <ul className={"list-group"} style={{height: 600, overflowY: "scroll"}}>
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
                                        <label>
                                            <strong>{assignedTablets[tabletID] ? assignedTablets[tabletID] : tabletID}</strong>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"col-md-4 col-lg-4"}>
                            <h3 style={{textAlign: "center"}}> Select Student(s) </h3>
                            <ul className={"list-group mb-2"} style={{height: 600, overflowY: "scroll", width: 300}}>
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
                        <div className={"col-md-4 col-lg-4"} style={{marginLeft: 70}}>
                            <h3 style={{textAlign: "center"}}> Remove Assignation
                                <select onChange={(e) => {
                                    setAssignedStudentID(e.target.value);
                                }}>
                                    <option value="null">öğrenci seçiniz</option>
                                    {allStudents && allStudents.map((student) => (
                                        <option key={student.id} value={student.id}> {student.name} </option>
                                    ))}
                                </select></h3>
                            
                            <ul className={"list-group mb-2"} style={{height: 600, overflowY: "scroll", width: 300}}>
                                {assignedTabletsDelete ? 
                                    Object.entries(assignedTabletsDelete).map(([key, value]) => (
                                        <li key={key} className={"list-group-item"}>
                                            <button className={"btn btn-danger"}
                                                    onClick={() => handleDelete(assignedStudentID, key)}><i
                                                className={"fa-solid fa-trash-can"}></i></button>
                                            <label style={{marginLeft: 10}}>{value}</label>
                                        </li>
                                    ))
                                    : <li className="list-group-item">No tablets assigned</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTablet;