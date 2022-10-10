import { useContext } from "react";
import AuthContext from "../context/DataProvider";

function useAuth(){
    return useContext(AuthContext);
}

export default useAuth;