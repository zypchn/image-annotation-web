import {formatDistanceToNow} from "date-fns";
const TabletCards = ({ listOfTablets }) => {
   
   return (
       <div className={"row-sm-2 my-5 mx-3 d-inline-flex"}>
           <div className={"card"} style={{width: 280, height:400}}>
               <div className={"card-header text-center h5"} style={{color: listOfTablets?.status === "labeled" ? "green" : "red"}} key={listOfTablets._id}>
                   {listOfTablets.status}
               </div>
               <div className={"card-body"}>
                   <img src={"http://localhost:4000/uploads/" + listOfTablets.name} className={"card-img-top"} style={{height: 175}} alt={"tablet"} />
                   <h5 className={"card-title my-4"}> {listOfTablets.name.split(".")[0]} </h5>
                   <a href={"/tablets/" + (listOfTablets.name)} className={"btn btn-primary align-items-center"}> Label </a>
               </div>
               <div className={"card-footer text-muted"}>
                   last update: {formatDistanceToNow(new Date(listOfTablets.updatedAt), {addSuffix: true})}
               </div>
           </div>
       </div>
    )
}

export default TabletCards