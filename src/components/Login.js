import React from 'react';
import styled from 'styled-components';

import ModalLoader from './ModalLoader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 46px;
  letter-spacing: 0.2em;
`;

const Login = props => {
  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }
  return (
    <Container>
      <Heading>Notey</Heading>
    </Container>
  );
};

export default Login;
