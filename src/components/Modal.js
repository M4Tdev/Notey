import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const Modal = props => {
  const fade = useSpring({
    from: { opacity: 0, marginTop: -100 },
    to: { opacity: 1, marginTop: 0 },
  });

  return ReactDOM.createPortal(
    <animated.div style={fade}>{props.children}</animated.div>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
