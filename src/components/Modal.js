import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props =>
  ReactDOM.createPortal(
    <>{props.children}</>,
    document.querySelector('#modal-root')
  );

export default Modal;
