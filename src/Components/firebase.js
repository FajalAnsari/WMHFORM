import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCM_MmjUox9Wb315Xn3tXDLYoPHFt6znFY",
    authDomain: "crud-operation-3ab3a.firebaseapp.com",
    projectId: "crud-operation-3ab3a",
    storageBucket: "crud-operation-3ab3a.appspot.com",
    messagingSenderId: "528979481974",
    appId: "1:528979481974:web:67b94ef03c87dd996a5657"
  };
  firebase.initializeApp(firebaseConfig);
  export const dataref = firebase.database();
  export const storage = firebase.storage();
  export default firebase;
