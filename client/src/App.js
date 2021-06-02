import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from './context';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AddEmployee from './pages/AddEmployee';
import Performance from './pages/Performance';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const { isAuthenticated } = useGlobalContext();
  
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact> { isAuthenticated ? <Admin /> : <Redirect to="/login" />} </Route>
        <Route path="/login" > { isAuthenticated ? <Redirect to="/" /> : <Login /> }  </Route>  
        <Route path="/employee" exact> <AddEmployee /> </Route>      
        <Route path="/employee/:id" ><AddEmployee /> </Route>   
        <Route path="/performance/:id" > <Performance /> </Route> 
      </Router>
  </div>
  );
}

export default App;
