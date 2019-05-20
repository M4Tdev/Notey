import React from 'react';
import styled from 'styled-components';
import { Google } from 'styled-icons/fa-brands';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import base from '../base';

import ModalLoader from './ModalLoader';

const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 4.6rem;
  letter-spacing: 0.2em;
  color: var(--color-grey);
`;

const Button = styled.button`
  background-color: var(--color-main);
  border-radius: 1rem;
  border: none;
  color: var(--color-white);
  padding: 1.5rem 4.5rem;
  margin: 11.2rem 0;
  position: relative;
  text-align: center;
  font-weight: 400;
  font-size: 2rem;
`;

const GoogleIcon = styled(Google)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 3rem;
`;

const onSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  base.auth().signInWithPopup(provider);
};

const Login = props => {
  const fade = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }

  return (
    <Container style={fade}>
      <Heading>Notey</Heading>
      <Button onClick={onSignIn}>
        <GoogleIcon />
        Login with Google
      </Button>
    </Container>
  );
};

Login.propTypes = {
  isSignedIn: PropTypes.bool,
};

export default Login;
