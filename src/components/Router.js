import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// imports associated with Redux
import { signIn, signOut, clearNotes } from '../actions';
import history from '../history';

// Components
import ModalLoader from './ModalLoader';
import App from './App';
import Login from './Login';
import EmailLogin from './EmailLogin';
import EmailRegister from './EmailRegister';
import EmailReset from './EmailReset';

// Hooks
import useAuth from '../hooks/useAuth';

const Router = ({ signIn, signOut, isSignedIn, clearNotes }) => {
  useAuth(signIn, signOut, clearNotes);

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
          path="/email-login"
          exact
          component={props => <EmailLogin {...props} isSignedIn={isSignedIn} />}
        />
        <Route
          path="/email-register"
          exact
          component={props => (
            <EmailRegister {...props} isSignedIn={isSignedIn} />
          )}
        />
        <Route
          path="/email-reset"
          exact
          render={props => <EmailReset {...props} isSignedIn={isSignedIn} />}
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
  clearNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(
  mapStateToProps,
  { signIn, signOut, clearNotes }
)(Router);
