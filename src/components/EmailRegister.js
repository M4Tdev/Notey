import React, { useState } from 'react';
import history from '../history';

import ModalLoader from './ModalLoader';
import EmailForm from './EmailForm';
import base from '../base';

const EmailRegister = props => {
  const [errorMessage, setErrorMessage] = useState(null);
  const onRegister = values => {
    base
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        // console.log(errCode, errMessage);
        setErrorMessage(errMessage);
      });
  };

  const switchToLogin = () => {
    history.push('/email-login');
  };

  if (props.isSignedIn === null) {
    return <ModalLoader />;
  }

  return (
    <div>
      <EmailForm
        action="register"
        switchToLogin={switchToLogin}
        onSubmit={onRegister}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default EmailRegister;
