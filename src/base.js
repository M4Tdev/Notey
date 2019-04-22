import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBwQEC3qBBmBU0VxOkWoGDQlxCIJ8WpcTc',
  authDomain: 'notey-236517.firebaseapp.com',
  databaseURL: 'https://notey-236517.firebaseio.com',
  projectId: 'notey-236517',
  storageBucket: 'notey-236517.appspot.com',
  messagingSenderId: '1072049778333',
};

export default firebase.initializeApp(config);
