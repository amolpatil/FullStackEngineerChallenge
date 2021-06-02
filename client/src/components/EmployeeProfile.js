import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../components/layout/Alert';
import Loading from './layout/Loading';
import AnchorBtn from '../components/layout/AnchorBtn';
import setAuthToken from '../utils/setAuthToken'

const EmployeeProfile = ({ empId, operationType }) => {
    
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    });
    const [alert, setAlert] = useState({
        showAlert : false,
        alertType : '',
        alertMessage: ''
    });

    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("ems_token");
        setAuthToken(JSON.parse(token));
    }, [])

    
    
    useEffect(() => {
        const getEmployee = async () => {
            try{
                const res = await axios.get(`/api/employees/${empId}`);
                const { name, email, isAdmin } = res.data;
                setFormData((prevState) => {
                   return { 
                       ...prevState,
                        name, 
                        email, 
                        isAdmin 
                    }
                })
                setLoading(false);          
            } catch(error) {
                if(error.response && error.response.status === 400) {                  
                    setLoading(false);       
                } else {
                    console.log(error);
                } 
            }
        }
        if(empId) {
            setLoading(true);            
            getEmployee();
        }
        
    }, [empId])

    const changeHandler = (e) => {
        let value = e.target.value;
        
        if(e.target.name === 'isAdmin') {
            value = value !== "true" ? true : false;
        }

        setFormData({
            ...formData,
            [e.target.name] : value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try{
            let res;
            if(operationType !== 'edit') {
                res = await axios.post('/api/employees', formData);
            } else {
                res = await axios.patch(`/api/employees/${empId}`, {empId: empId, name: formData.name, isAdmin: formData.isAdmin});
            }
            
            setAlert({
                showAlert : true,
                alertType : 'success',
                alertMessage: res.data.message
            });
            setLoading(false);          
        } catch(error) {
            if(error.response && error.response.status === 400) {               
                setLoading(false);    
                setAlert({
                    showAlert : true,
                    alertType : 'danger',
                    alertMessage: error.response.data.errors[0].msg
                });     
            } else {
                console.log(error);
                setAlert({
                    showAlert : true,
                    alertType : 'danger',
                    alertMessage: error
                });
            } 
        }
    }

    const removeAlert = () => {
        setAlert({
            showAlert : false,
            alertType : '',
            alertMessage: ''
        });
        if(operationType !== 'edit') {
            setFormData({
                name: '',
                email: '',
                password: '',
                isAdmin: false
            })
        }
        
    }

    return (
        <section className="container">
            <h1 className="large text-primary">
                { operationType === 'edit' ? "Edit" : "Create"} Employee Profile
            </h1>
            { alert.showAlert && <Alert errorType={alert.alertType} alertMessage={alert.alertMessage} removeAlert={removeAlert} /> }
            {loading && <Loading /> }
            <form className="form" onSubmit={(e)=> submitHandler(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input type="text" 
                        placeholder="Name" 
                        name="name" 
                        required 
                        id="name" 
                        value= {formData.name}
                        onChange={(e)=> changeHandler(e)}
                    />                    
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        id="email" 
                        required 
                        value = { formData.email }
                        onChange={(e)=> changeHandler(e)}
                        disabled = { operationType === 'edit' ? true : false }
                    />                    
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <input 
                        type="password" 
                        minLength="6" 
                        placeholder="password" 
                        name="password" 
                        id="password" 
                        value = {formData.password}
                        required 
                        disabled = { operationType === 'edit' ? true : false }
                        onChange={(e)=> changeHandler(e)}
                    />                    
                </div>
                <div className="form-group">
                    <label htmlFor="isAdmin">Is Admin?</label>
                    <input 
                        type="checkbox" 
                        name="isAdmin" 
                        id="isAdmin" 
                        value={formData.isAdmin}
                        checked = {formData.isAdmin}
                        className="m-1"
                        onChange={(e)=> changeHandler(e)}
                    />                    
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <AnchorBtn buttonClass="btn-light my-1" link="/"><i className="fas fa-arrow-left text-white"></i> Go Back</AnchorBtn>
                
            </form>
        </section>
    )
}

export default EmployeeProfile
