const TabletCards = () => {

   return (
        <div className={"tablet-card"}>
            <div className={"row"}>
                <div className={"col-sm-2"}>
                    <div className={"card"}>
                        <div className={"card-header"} key={tablets._id}>
                            Header
                        </div>
                        <div className={"card-body"}>
                            <img src={tablets.tabletPath} className={"card-img-top"} alt={"tablet"} />
                            <h5 className={"card-title"}> {tablets.tabletName} </h5>
                            <a href={"#"} className={"btn btn-primary"}> Label </a>
                        </div>
                        {/*
                            <div className={"card-footer text-muted"}>
                                {formatDistanceToNow(new Date(tablets.updatedAt), {addSuffix: true})}
                            </div>
                         */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabletCards