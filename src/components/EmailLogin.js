import React, { useState } from 'react';
import history from '../history';

import ModalLoader from './ModalLoader';
import EmailForm from './EmailForm';
import base from '../base';

const EmailLogin = props => {
  const [errorMessage, setErrorMessage] = useState(null);
  const onSignIn = values => {
    base
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        // console.log(errCode, errMessage);
        setErrorMessage(errMessage);
      });
  };

  const switchToRegister = () => {
    history.push('/email-register');
  };

  const onForgotPassword = () => {
    history.push('/email-reset');
  };

  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }

  return (
    <div>
      <EmailForm
        action="login"
        switchToRegister={switchToRegister}
        onSubmit={onSignIn}
        errorMessage={errorMessage}
        onForgotPassword={onForgotPassword}
      />
    </div>
  );
};

export default EmailLogin;
