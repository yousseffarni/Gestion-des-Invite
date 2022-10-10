import React,{useContext} from "react";
import { useLocation,Navigate,Outlet} from "react-router-dom";
import DataContext from "../context/DataProvider";


const RequireAuth = () =>{
  const {auth} = useContext(DataContext);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/Login" state={{ form: location }} replace/>;
  }

  return <Outlet/>;
}

export default RequireAuth;