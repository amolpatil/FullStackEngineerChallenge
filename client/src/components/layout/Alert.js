import React, { useEffect } from 'react';

const Alert = ({ errorType, alertMessage, removeAlert}) => {
    const className = errorType === 'danger' ? 'alert-danger' : 'alert-success';
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    });

    return (
        <div className={`alert ${className}`}>
            {alertMessage}
        </div>
    )
}

export default Alert
