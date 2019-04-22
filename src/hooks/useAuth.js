/* eslint-disable */
import { useEffect } from 'react';
import firebase from 'firebase';
import base from '../base';

import history from '../history';

export default (signIn, signOut) => {
  useEffect(() => {

    const onAuthChange = async user => {
      if (user) {
        console.log(user);
        await signIn(user.uid, user.email);
        history.push('/notes');
      } else {
        await signOut();
        history.push('/login');
      }
    };

    base.auth().onAuthStateChanged(user => {
        onAuthChange(user);
    });

    // window.gapi.load('client:auth2', () => {
    //   window.gapi.client
    //     .init({
    //       clientId:
    //         '1072049778333-cr6k2qp169bsgkolvtk3bncuor50m2oh.apps.googleusercontent.com',
    //       scope: 'email',
    //     })
    //     .then(() => {
    //       auth = window.gapi.auth2.getAuthInstance();
    //       onAuthChange(auth.isSignedIn.get());
    //       auth.isSignedIn.listen(onAuthChange);
    //     });
    // });
  }, []);

};
