import React, { useState, useEffect, useContext } from 'react'
import setAuthToken from './utils/setAuthToken';


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    name: '',
    empId: ''
  });

  const setToken = () => {
    const token = localStorage.getItem("ems_token");
    const adminAccess = localStorage.getItem("ems_isAdmin");
    const userDetails = localStorage.getItem("ems_user");
    if(token) {
      setIsAuthenticated(JSON.parse(true));
      setIsAdmin(JSON.parse(adminAccess));
      const {name, empId} = JSON.parse(userDetails);
      setUser({name, empId});
    }
    setAuthToken(JSON.parse(token));
  }

  useEffect(()=>{
    setToken();
  },[]);
 
  const setCurrentUser = (data)=>{
    localStorage.setItem("ems_token", JSON.stringify(data.token));
    localStorage.setItem("ems_isAdmin", JSON.stringify(data.isAdmin));
    localStorage.setItem("ems_user", JSON.stringify({ name: data.name, empId: data.empId }));
    setIsAuthenticated(true);
    setIsAdmin(data.isAdmin);
    setUser({name:data.name, empId:data.empId});
  };
  
  const logout = () => {
    localStorage.removeItem("ems_token");
    localStorage.removeItem("ems_isAdmin");
    localStorage.removeItem("ems_user");
    setIsAuthenticated(false);
    setUser({
      name: '',
      empId: ''
    });
    setIsAdmin(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        setCurrentUser,
        setToken,
        logout      
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
