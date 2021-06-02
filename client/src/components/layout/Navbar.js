import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const Navbar = () => {
    const { user, logout } = useGlobalContext();

    const clickHandler = (e) => {
        e.preventDefault();
        logout();
    }
    
    const getUserMarkup = () =>{
        if(user.name) {
            return (<>
                <p>Welcome {user.name} </p>
                <a href="/#" onClick={clickHandler}><i className="fas fa-power-off text-primary"></i> Logout</a>
                </>
            )
        }
    }
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-users"></i> EMS</Link>
                </h1>
                { user.name && getUserMarkup() }
                 
            </nav>
        </div>
    )
}

export default Navbar
