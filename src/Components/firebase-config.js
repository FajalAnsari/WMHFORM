// Your web app's Firebase configuration
import { createContext, useContext , useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyArqvnO85h8Yn8p15BpdK12NbeIZ25YwpY",
  authDomain: "upload-4fe61.firebaseapp.com",
  projectId: "upload-4fe61",
  storageBucket: "upload-4fe61.appspot.com",
  messagingSenderId: "695823135747",
  appId: "1:695823135747:web:fdc03444ec3d94c63f8a36",
  measurementId: "G-X2WWP96J3S"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

    const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

    const isLoggedIn = user ? true : false;

   return < FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, singinUserWithEmailAndPass, isLoggedIn}}>{props.children}</FirebaseContext.Provider>
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);


