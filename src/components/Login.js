import React from 'react';
import styled from 'styled-components';
import { Google } from 'styled-icons/fa-brands';

import ModalLoader from './ModalLoader';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 46px;
  letter-spacing: 0.2em;
  color: #5b5b5b;
`;

const Button = styled.button`
  background-color: #4285f4;
  border-radius: 10px;
  border: none;
  color: #fff;
  padding: 15px 45px;
  margin: 112px 0;
  position: relative;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
`;

const GoogleIcon = styled(Google)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 30px;
`;

const onSignIn = () => {
  window.gapi.auth2.getAuthInstance().signIn();
};

const Login = props => {
  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }
  return (
    <Container>
      <Heading>Notey</Heading>
      <Button onClick={onSignIn}>
        <GoogleIcon />
        Login with Google
      </Button>
    </Container>
  );
};

export default Login;
