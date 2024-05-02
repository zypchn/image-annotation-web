import {TabletsContext} from "../context/TabletsContext.jsx";
import {useContext} from "react"

export const useTabletsContext = () => {
    const context = useContext(TabletsContext)
    
    if (!context) { throw Error("useTabletsContext must be used inside an TabletsContextProvider") }
    
    return context
}