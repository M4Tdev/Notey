import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// imports associated with Redux
import { signIn, signOut } from '../actions';
import history from '../history';

// Components
import ModalLoader from './ModalLoader';
import App from './App';
import Login from './Login';

// Hooks
import useAuth from '../hooks/useAuth';

const Router = ({ signIn, signOut, isSignedIn }) => {
  useAuth(signIn, signOut);

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={ModalLoader} />
        <Route
          path="/login"
          exact
          render={props => <Login {...props} isSignedIn={isSignedIn} />}
        />
        <Route
          path="/notes"
          render={props => <App {...props} isSignedIn={isSignedIn} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(Router);
