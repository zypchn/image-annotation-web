import {formatDistanceToNow} from "date-fns";
import {useState} from "react";
import axios from "axios";
import {useAuthContext} from "../hooks/useAuthContext.js";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const TabletCards = ({ listOfTablets }) => {
    
    const {user} = useAuthContext();
    
    const [isEdit, setIsEdit] = useState(false);
    
    const changeCustomID = async (customID) => {
        await axios.patch(`${apiUrl}/tablets/${listOfTablets.id}/customID`, {
            customID: customID
        }, {
            headers: {"Authorization": `Bearer ${user.token}`}
        }).then().catch();
    };
   
   return (
       <div className={"row-sm-2 my-5 mx-5 d-inline-flex "}>
           <div className={"card"} style={{width: 280}}>
               <div className={"card-header text-center h5"} style={{color: listOfTablets?.status === "done" ? "green" : listOfTablets.status === "ready to check" ? "orange": "red"}} key={listOfTablets._id}>
                   {listOfTablets.status}
               </div>
               <div className={"card-body"}>
                   <img src={`${baseUrl}/uploads/` + listOfTablets.name} className={"card-img-top"} style={{height: 175}} alt={"tablet"} />
                   <h4 className={"card-title my-4"}> {listOfTablets.customID ? listOfTablets.customID : listOfTablets.name} &nbsp; &nbsp; <i className="fa-regular fa-pen-to-square" onClick={() => setIsEdit(!isEdit)}></i> </h4>
                   {isEdit && <div>
                       <input type={"text"} id={"changeCustomIDField"} style={{display: "inline-block"}}/>
                       <button style={{border: "none"}} onClick={() => {
                           const customID = document.getElementById("changeCustomIDField").value;
                           changeCustomID(customID).then();
                           location.reload();
                       }}> Change ID </button>
                   </div>}
                   <h6 className={"card-title my-4"}> Database ID: {listOfTablets.id} </h6>
                   <a href={"/tablet/" + (listOfTablets.id)} className={"btn btn-primary align-items-center my-2"}> Label </a>
               </div>
               <div className={"card-footer text-muted"}>
                   last update: {formatDistanceToNow(new Date(listOfTablets.updatedAt), {addSuffix: true})}
               </div>
           </div>
       </div>
    )
}

export default TabletCards