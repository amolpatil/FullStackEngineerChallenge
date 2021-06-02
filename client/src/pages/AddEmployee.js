import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeProfile from '../components/EmployeeProfile';

const Employee = () => {
    
    const { id } = useParams();
    
    if(id) {
        return <EmployeeProfile empId = { id } operationType = "edit" />
    }
    
    return <EmployeeProfile />
}

export default Employee
