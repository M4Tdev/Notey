import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import '../css/loadingSpinner.scss';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h2`
  letter-spacing: 10px;
  color: rgba(91, 91, 91, 0.7);
  font-family: 'Montserrat', sans-serif;
`;

const ModalLoader = () =>
  ReactDOM.createPortal(
    <Container>
      <Logo>Notey</Logo>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </Container>,
    document.querySelector('#ModalLoader')
  );

export default ModalLoader;
