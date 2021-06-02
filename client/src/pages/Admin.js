import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import AnchorBtn from '../components/layout/AnchorBtn';
import EmployeeListItem from '../components/EmployeeListItem';
import Loading from '../components/layout/Loading';
import Modal from '../components/layout/modal';
import Alert from '../components/layout/Alert';
import { useGlobalContext } from '../context';

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [empToBeDeleted, setEmpToBeDeleted] = useState('');
    const [alert, setAlert] = useState({
        showAlert : false,
        alertType : '',
        alertMessage: ''
    });
    const { setToken, isAdmin, user } = useGlobalContext();
    
    const getAllEployees = async () =>{
        setLoading(true);
        try{
            const res = await axios.get('/api/employees');
            setList(res.data);
            setLoading(false);
        } catch(error) {
            console.log(error);   
            setLoading(false);     
        }
    }
    useEffect(() => {
        setToken();
        
        getAllEployees();
    }, []);

    const deleteEmployee = (confirm) => {
        console.log(confirm, empToBeDeleted);
        setShowModal(false);

        const confirmDelete = async () => {
            try{
                const res = await axios.delete(`/api/employees/${empToBeDeleted}`);    
                  
                setAlert({
                    showAlert : true,
                    alertType : 'success',
                    alertMessage: res.data && res.data.message
                });
                getAllEployees();   
                setLoading(false);      
            } catch(error) {
                console.log(error);   
                setLoading(false);     
            }
        }

        if(confirm) {
            confirmDelete();
        }
        
    }

    const deleteClickHandler = (e, id) => {
        e.preventDefault();
        setEmpToBeDeleted(id);
        setShowModal(true)
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
            { loading && <Loading />}
            <h1 className="large text-primary">Employees</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and Add/Edit Employees
            </p>
            {
                isAdmin &&   
                <div className="dash-buttons my-1">                
                    <AnchorBtn buttonClass="btn-dark" link="/employee"><i className="fas fa-user-plus text-white"></i> Add Employee</AnchorBtn>
                </div>
            }
            { showModal && <Modal clickHandler={deleteEmployee}/> }

            { alert.showAlert &&  <Alert errorType= {alert.alertType} alertMessage={alert.alertMessage} removeAlert={removeAlert} /> }
            
            <div className="profiles">
                {
                    list.map(item => {
                       return (
                         <EmployeeListItem item={item} key={item.empId} clickHandler={deleteClickHandler} />
                       )
                    })
                }
            </div>
        </section>
    )
}

export default Admin
