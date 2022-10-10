import React,{useState,createContext} from "react";

const DataContext= createContext({});

export const DataProvider = ({children}) =>{
    const [auth,setAuth]=useState(false);
    const [user,setUser]=useState([]);

    return (
        <DataContext.Provider value={{
            auth,setAuth,
            user,setUser 
        }}>
        {children}
        </DataContext.Provider>
    )
    
}

export default DataContext;