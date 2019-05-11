import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBwQEC3qBBmBU0VxOkWoGDQlxCIJ8WpcTc',
  authDomain: 'notey-236517.firebaseapp.com',
  databaseURL: 'https://notey-236517.firebaseio.com',
  projectId: 'notey-236517',
  storageBucket: 'notey-236517.appspot.com',
  messagingSenderId: '1072049778333',
};

const firebaseApp = firebase.initializeApp(config);
const db = firebase.firestore();

export { db };
export default firebaseApp;
