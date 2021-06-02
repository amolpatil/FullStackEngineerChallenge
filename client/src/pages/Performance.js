import React, {useEffect, useState } from 'react';
import Loading from '../components/layout/Loading';
import Alert from '../components/layout/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AnchorBtn from '../components/layout/AnchorBtn';
import setAuthToken from '../utils/setAuthToken';
import { useGlobalContext } from '../context';


const Performance = () => {
    const { id } = useParams();
    const { user, isAdmin } = useGlobalContext();
    const [alert, setAlert] = useState({
        showAlert : false,
        alertType : '',
        alertMessage: ''
    });
    const [ loading, setLoading ] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
        feedback: {
            rating : 1, 
            comment : '', 
            assignedTo : user.empId,
            assignedName: user.name,
            isDone: false
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("ems_token");
        setAuthToken(JSON.parse(token));
    }, []);
    
    useEffect(() => {
        setLoading(true);
        const getEmployee = async () => {
            try{
                const res = await axios.get(`/api/employees/${id}`);
                setCurrentEmployee(res.data);    
                setLoading(false);       
            } catch(error) {
                if(error.response && error.response.status === 400) {                  
                    setLoading(false);       
                } else {
                    console.log(error);
                    setLoading(false);       
                } 
            }
        }
        getEmployee();
    }, [id]);

    const changeHandler = (e) => {
        let value = e.target.value;
        
        if(e.target.name === 'isDone') {
            value = value !== "true" ? true : false;
        }
        const feedback = {
            ...currentEmployee.feedback
        }
        
        setCurrentEmployee({
            ...currentEmployee,
            feedback: {
                ...feedback,
                [e.target.name] : value
            }

        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const submitPerformance = async () => {
            try{
                const res = await axios.patch(`/api/employees/${id}`, currentEmployee);                
                setLoading(false);  
                setAlert({
                    showAlert : true,
                    alertType : 'success',
                    alertMessage: res.data.message
                });     
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
                    setLoading(false);    
                    setAlert({
                        showAlert : true,
                        alertType : 'danger',
                        alertMessage: error
                    });   
                } 
            }
        }
        submitPerformance();
    }

    const removeAlert = () => {
        setAlert({
            showAlert : false,
            alertType : '',
            alertMessage: ''
        });
    }

    const { rating, comment, assignedTo, isDone } = currentEmployee.feedback;
    
    return (
        <section className="container">
            { loading && <Loading />}
            <h1 className="large text-primary">Employee Performance</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Add/Edit Employee's Performance
            </p>
            { alert.showAlert && <Alert errorType={alert.alertType} alertMessage={alert.alertMessage} removeAlert={removeAlert} /> }
            <form className="form" onSubmit={(e) => submitHandler(e)}>
                <div className="form-group">
                    <label htmlFor="rating">Rating*</label>
                    <select 
                        placeholder="Rating" 
                        name="rating" 
                        required 
                        id="rating" 
                        value={rating}
                        onChange={changeHandler}
                    >     
                    {
                        [1,2,3,4,5].map(option => {
                            return <option value={option}  key={option}>{option}</option>
                        })
                    }
                    </select>               
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment*</label>
                    <textarea 
                        placeholder="comment" 
                        name="comment" 
                        required 
                        id="comment"
                        value = { comment }
                        onChange={changeHandler}
                    />                    
                </div>
                
                <div className="form-group">
                    <label htmlFor="assignedTo">Assigned to Emp ID*</label>
                    <input type="text" 
                        placeholder="Assigned To" 
                        name="assignedTo" 
                        required 
                        id="assignedTo" 
                        onChange={changeHandler}
                        disabled= {isAdmin ? false : true}
                       value = { assignedTo === "Admin" ? user.empId : assignedTo}
                    />                   
                </div>
                <div className="form-group">
                    <label htmlFor="isDone">Review done*</label>
                    <input type="checkbox" 
                        name="isDone" 
                        id="isDone" 
                        onChange={changeHandler}
                       value = { isDone }
                       checked= { isDone }
                       className= "m-1"
                    />                      
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <AnchorBtn buttonClass="btn-light my-1" link="/"><i className="fas fa-arrow-left text-white"></i> Go Back</AnchorBtn>
            </form>
        </section>
    )
}

export default Performance
