import React, { useEffect } from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';
import history from '../history';

import App from './App';
import Loader from './Loader';
import Login from './Login';

const Router = props => {
  useEffect(() => {
    let auth;

    const onAuthChange = async isSignedIn => {
      if (isSignedIn) {
        await props.signIn(auth.currentUser.get().getId());
        history.push('/notes');
      } else {
        await props.signOut();
        history.push('/login');
      }
    };

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '1072049778333-cr6k2qp169bsgkolvtk3bncuor50m2oh.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [props]);

  return (
    <BrowserRouter history={history}>
      <Route path="/" exact component={Loader} />
      <Route path="/login" exact component={Login} />
      <Route path="/notes" exact component={App} />
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(Router);
