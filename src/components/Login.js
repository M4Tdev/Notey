import React from 'react';
import ModalLoader from './ModalLoader';

const Login = props => {
  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }
  return <div>Login to Notey</div>;
};

export default Login;
