import {formatDistanceToNow} from "date-fns";

const baseUrl = process.env.REACT_APP_BASE_URL;

const TabletCards = ({ listOfTablets }) => {
   
   return (
       <div className={"row-sm-2 my-5 mx-5 d-inline-flex "}>
           <div className={"card"} style={{width: 280}}>
               <div className={"card-header text-center h5"} style={{color: listOfTablets?.status === "done" ? "green" : listOfTablets.status === "ready to check" ? "orange": "red"}} key={listOfTablets._id}>
                   {listOfTablets.status}
               </div>
               <div className={"card-body"}>
                   <img src={`${baseUrl}/uploads/` + listOfTablets.name} className={"card-img-top"} style={{height: 175}} alt={"tablet"} />
                   <h2 className={"card-title my-4"}> {listOfTablets.customID ? listOfTablets.customID : listOfTablets.name} </h2>
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