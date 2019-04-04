import React from 'react';
import styled, { keyframes } from 'styled-components';

const Logo = styled.h3`
  letter-spacing: 10%;
  color: rgba(91, 91, 91, 0.7);
  font-family: 'Montserrat', sans-serif;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ldsDualRing = keyframes`
	0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Load = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  transform: scale(0.3);

  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, 0.7);
    border-color: rgba(0, 0, 0, 0.7) transparent rgba(0, 0, 0, 0.7) transparent;
    animation: ${ldsDualRing} 1.2s linear infinite;
  }
`;

const Loader = () => (
  <Container>
    <Logo>Notey</Logo>
    <Load />
  </Container>
);

export default Loader;
