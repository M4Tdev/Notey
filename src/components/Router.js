import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn, signOut } from '../actions';
import history from '../history';

import App from './App';
import Login from './Login';

import useAuth from '../hooks/useAuth';

const Router = ({ signIn, signOut, isSignedIn }) => {
  useAuth(signIn, signOut);

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route
          path="/"
          exact
          render={props => <Login {...props} isSignedIn={isSignedIn} />}
        />
        <Route
          path="/notes"
          exact
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
