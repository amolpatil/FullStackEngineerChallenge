import React from 'react';
import { useGlobalContext } from '../context';
import AnchorBtn from '../components/layout/AnchorBtn';

const EmployeeListItem = ({item, clickHandler}) => {
    const { user, isAdmin } = useGlobalContext();
    const { empId, name } = item;

    if(user.empId !== item.feedback.assignedTo && !isAdmin) {
        return null
    }
   
    const getAdminMarkup = () => {
        
        return <ul>
            <li>
                <AnchorBtn buttonClass="btn-primary my" link={`/employee/${empId}`}><i className="fas fa-user-circle text-secondory"></i> View Profile</AnchorBtn>                                                       
            </li>
            { user.empId !== empId && (<li>
                <AnchorBtn buttonClass="btn-primary my" link={`/performance/${empId}`}><i className="fas fa-chart-bar text-secondory"></i> Performance</AnchorBtn>                           
            </li>) }
            {
                user.empId !== empId && (<li>
                    <AnchorBtn buttonClass="btn-danger my" link="#" empId={empId} clickHandler={(e) => clickHandler(e, empId)}><i className="fas fa-user-minus text-secondory"></i> Delete</AnchorBtn>                           
                </li>)
            }
            
        </ul>
    }

    const getNonAdminMarkup = () => {
       
        return <ul>
            { user.empId !== empId && (<li>
                <AnchorBtn buttonClass="btn-primary my" link={`/performance/${empId}`}><i className="fas fa-chart-bar text-secondory"></i> Performance</AnchorBtn>                           
            </li>) }
        </ul>
    }
    return (
        <section className="profile bg-light">
            <i className="fas fa-user-circle emp-profile"></i>
            <div>
                <h2>Name: {name}</h2>
                <p>Employee ID: {empId}</p>                        
            </div>
            {isAdmin ? getAdminMarkup() : getNonAdminMarkup()}
        </section>
    )
}

export default EmployeeListItem
