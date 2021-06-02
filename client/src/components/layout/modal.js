import React from 'react';
const Modal = ({  clickHandler }) => {

  return (
    <div className="modal-overlay show-modal">
      <div className='modal-container'>
        <h3>Do you want to delete employee?</h3>
        <a href="/#" className='btn btn-danger' onClick={()=>clickHandler(true)}>
          Confirm
        </a>
        <a href="/#" className='btn btn-dark' onClick={()=>clickHandler(false)} >
          Cancel
        </a>
      </div>
    </div>
  );
};

export default Modal;