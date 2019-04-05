import React from 'react';
import ModalLoader from './ModalLoader';

const App = props => {
  if (!props.isSignedIn) {
    return <ModalLoader />;
  }
  return <div>Welcome to Notey app</div>;
};

export default App;
