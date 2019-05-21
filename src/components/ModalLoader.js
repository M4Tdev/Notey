import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import '../css/loadingSpinner.scss';

const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalLoader = () => {
  const fade = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return ReactDOM.createPortal(
    <Container style={fade}>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </Container>,
    document.querySelector('#modal-root')
  );
};

export default ModalLoader;
