/*

##########
Using React Hooks to keep track of LOGOUT operation
##########

*/

import {useAuthContext} from "./useAuthContext.js";

export const useLogout = () => {
    
    const { dispatch } = useAuthContext();
  const logout = () => {
      localStorage.removeItem("user");   // remove user from storage
      dispatch({ type: "LOGOUT" });   // dispatch logout action
  };
  return { logout };
};