import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import axios from 'axios';
import Alert from '../components/layout/Alert';
import Loading from '../components/layout/Loading';
import setAuthToken from '../utils/setAuthToken';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        showAlert : false,
        alertType : '',
        alertMessage: ''
    });
    const { setCurrentUser } = useGlobalContext();

    useEffect(() => {        
        return () => {
            setFormData({})
            setLoading(false)
            setAlert({})
        };
    }, []);

    const changeHandler = (e) => {
        const value = e.target.value;        
        setFormData({
            ...formData,
            [e.target.name] : value
        });        
    }

    const login = async (data)=>{
        setLoading(true);
        try{
            const res = await axios.post('/api/auth',{...data});            
            setCurrentUser(res.data)
            setAuthToken(res.data.token);
            setAlert({
                showAlert: false,
                alertType : '',
                alertMessage: ''
            })    
            setLoading(false);
            
        } catch(error) {
            
            if(error.response && (error.response.status === 401 || error.response.status === 400)) {
                console.log(error.response.data);
                setAlert({
                    showAlert: true,
                    alertType : 'danger',
                    alertMessage: error.response.data.error.msg
                })                
            } else {
                console.log(error);
                setAlert({
                    showAlert: true,
                    alertType : 'danger',
                    alertMessage: 'Server error'
                })  
            }
            setLoading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        login(formData)
    }

    const removeAlert = () => {
        setAlert({
            showAlert : false,
            alertType : '',
            alertMessage: ''
        });
    }
    
    return (
        <section className="container">   
            { loading && <Loading /> }        
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            { alert.showAlert &&  <Alert errorType= {alert.alertType} alertMessage={alert.alertMessage} removeAlert={removeAlert}/> }
            <form className="form" onSubmit={(e)=> submitHandler(e)}>
                <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                    onChange={(e)=> changeHandler(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    min="6"
                    onChange={(e)=> changeHandler(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </section>
    )
}

export default Login
