import React from 'react';
import { Link } from 'react-router-dom';

const AnchorBtn = ({buttonClass, link, empId, clickHandler, children}) => {

    return (
        <> {
            clickHandler ?
            <Link to={link} className={`btn ${buttonClass}`} onClick={(e)=>clickHandler(e, empId) }>{children}</Link>
            :
            <Link to={link} className={`btn ${buttonClass}`}>{children}</Link>
        }
            
        </>
    )
}

export default AnchorBtn
