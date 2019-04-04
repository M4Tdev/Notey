/* eslint-disable */
import { useEffect } from 'react';

import history from '../history';

export default (signIn, signOut) => {
  useEffect(() => {
    let auth;

    const onAuthChange = async isSignedIn => {
      if (isSignedIn) {
        await signIn(auth.currentUser.get().getId());
        history.push('/notes');
      } else {
        await signOut();
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
					console.log('useAuth ran');
        });
    });
  }, []);

};
