import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AssignTablet = ({ assignedTablets }) => {
    
    const [showAlert, setShowAlert] = useState(false);
    
    const [allStudents, setAllStudents] = useState([]);
    const [selectedTablet, setSelectedTablet] = useState();
    const [selectedStudents, setSelectedStudents] = useState([]);
    
    const handleStudentSelect = (e) => {
        const { value, checked } = e.target;
        
        if (checked) {
            setSelectedStudents([...selectedStudents, Number(value)]);
        }
        else {
            setSelectedStudents(selectedStudents.filter((e) => e !== value));
        }
    };
    
    useEffect(() => {
        axios.get("http://localhost:4000/user/students")
        .then((response) => {setAllStudents(response.data)});
    }, []);
    
    const handleAssign = async () => {
        
        await axios.post("http://localhost:4000/user/assign", {
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
    
    return(
        <div>
            <h1 className={"my-5"}> Assign Tablet to Student(s) </h1>
            <div className={"container mt-4"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <h2> Select a Tablet </h2>
                        <ul className={"list-group"}>
                            {assignedTablets && assignedTablets.map(tabletID => (
                                <li key={tabletID} className={"list-group-item"}>
                                    <input
                                        type={"radio"}
                                        name={"tabletID"}
                                        value={tabletID}
                                        onChange={(e) => setSelectedTablet(e.target.value)}
                                        className={"mr-2"}
                                        style={{marginRight: 7}}
                                    />
                                    <label> Tablet ID: {tabletID} </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={"col-md-4"}>
                        <h2> Select Student(s) </h2>
                        <ul className={"list-group"}>
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
                        <button onClick={handleAssign}> Assign </button>
                        { showAlert && <div className={"alert alert-success my-2"}><strong> Assigned Successfully! </strong></div> }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTablet;