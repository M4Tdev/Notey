import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn, signOut } from '../actions';
import history from '../history';

import App from './App';
import Loader from './Loader';
import Login from './Login';

import useAuth from '../hooks/useAuth';

const Router = props => {
  useAuth(props.signIn, props.signOut);

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={Loader} />
        <Route path="/login" exact component={Login} />
        <Route path="/notes" exact component={App} />
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
