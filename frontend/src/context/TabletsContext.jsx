import {createContext, useReducer} from "react";

export const TabletsContext = createContext();

export const tabletsReducer = (state, action) => {
    
    switch (action.type) {
        
        case "SET_TABLETS":
            return { tablets: action.payload }
        
        case "CREATE_TABLET":
            return { tablets: [action.payload, state.tablets] }
        
        default:
            return state
    }
}

export const TabletsContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(tabletsReducer, {
        tablets: null
    });
    
    return (
        <TabletsContext.Provider value={{...state, dispatch}}>
            { children }
        </TabletsContext.Provider>
    )
}