import {formatDistanceToNow} from "date-fns";

const TabletCards = ({ tablets }) => {

   return (
       <div className={"row-sm-2 my-5 mx-3 d-inline-flex"}>
           <div className={"card"} style={{width: 280, height:400}}>
               <div className={"card-header text-center h5"} style={{color: tablets?.status === "labeled" ? "green" : "red"}} key={tablets._id}>
                   {tablets.status}
               </div>
               <div className={"card-body"}>
                   <img src={"/images/" + tablets.tabletName} className={"card-img-top"} style={{height: 175}} alt={"tablet"} />
                   <h5 className={"card-title my-4"}> {(tablets.tabletName).split(".")[0]} </h5>
                   <a href={"/tablets/" + (tablets.tabletName)} className={"btn btn-primary align-items-center"}> Label </a>
               </div>
               <div className={"card-footer text-muted"}>
                   last update: {formatDistanceToNow(new Date(tablets.updatedAt), {addSuffix: true})}
               </div>
           </div>
       </div>
    )
}

export default TabletCards