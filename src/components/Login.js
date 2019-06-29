import React from 'react';
import styled from 'styled-components';
import { Google } from 'styled-icons/fa-brands';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import base from '../base';
import history from '../history';

import ModalLoader from './ModalLoader';

const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled(animated.h1)`
  font-weight: bold;
  font-size: 4.6rem;
  letter-spacing: 0.2em;
  color: var(--color-grey);
`;

const Button = styled(animated.button)`
  background-color: ${({ provider }) =>
    provider === 'google' ? 'var(--color-main)' : 'var(--color-grey)'};
  border-radius: 1rem;
  border: none;
  color: var(--color-white);
  padding: 1.5rem 4.5rem;
  margin: 11.2rem 0 0;
  position: relative;
  text-align: center;
  font-weight: 400;
  font-size: 2rem;

  &:last-child {
    margin: 3rem 0 11.2rem;
  }
`;

const GoogleIcon = styled(Google)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 3rem;
`;

const googleOnSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  base.auth().signInWithPopup(googleProvider);
};

const emailOnSignIn = () => {
  history.push('/email-login');
};

const Login = props => {
  const fade = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const leftSlide = useSpring({
    config: { duration: 550 },
    from: { transform: 'translateX(-10rem)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  });

  const rightSlide = useSpring({
    config: { duration: 550 },
    from: { transform: 'translateX(10rem)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  });

  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }

  return (
    <Container style={fade}>
      <Heading style={leftSlide}>Notey</Heading>
      <Button style={rightSlide} onClick={googleOnSignIn} provider="google">
        <GoogleIcon />
        Login with Google
      </Button>
      <Button style={rightSlide} onClick={emailOnSignIn} provider="email">
        Login with Email
      </Button>
    </Container>
  );
};

Login.propTypes = {
  isSignedIn: PropTypes.bool,
};

export default Login;
