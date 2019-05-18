import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = props =>
  ReactDOM.createPortal(
    <>{props.children}</>,
    document.querySelector('#modal-root')
  );

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
