/* eslint-disable */
import { useEffect } from 'react';
import base from '../base';

import history from '../history';

export default (signIn, signOut, clearNotes) => {
  useEffect(() => {

    const onAuthChange = async user => {
      if (user) {
        await signIn(user.uid, user.email);
        history.push('/notes');
      } else {
        await signOut();
        await clearNotes();
        history.push('/login');
      }
    };

    base.auth().onAuthStateChanged(user => {
        onAuthChange(user);
    });
  }, []);

};
