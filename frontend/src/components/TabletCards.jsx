import {formatDistanceToNow} from "date-fns";

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const TabletCards = ({ listOfTablets }) => {
   
   return (
       <div className={"row-sm-2 my-5 mx-5 d-inline-flex "}>
           <div className={"card"} style={{width: 280, height:475}}>
               <div className={"card-header text-center h5"} style={{color: listOfTablets?.status === "done" ? "green" : listOfTablets.status === "ready to check" ? "orange": "red"}} key={listOfTablets._id}>
                   {listOfTablets.status}
               </div>
               <div className={"card-body"}>
                   <img src={`${baseUrl}/uploads/` + listOfTablets.name} className={"card-img-top"} style={{height: 175}} alt={"tablet"} />
                   <h4 className={"card-title my-4"}> {listOfTablets.name.split(".")[0]} </h4>
                   <h5 className={"card-subtitle my-4"}> ID: {listOfTablets.id} </h5>
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