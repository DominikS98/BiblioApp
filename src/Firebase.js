import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";



const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDs5dX4SgxS-FpTBz94ggg2khoxOCh4lh8",
  authDomain: "inzbiblio.firebaseapp.com",
  projectId: "inzbiblio",
  storageBucket: "inzbiblio.appspot.com",
  messagingSenderId: "281858679923",
  appId: "1:281858679923:web:039751a4430fa105143606",
  measurementId: "G-L4ELMPGBN1",
});

const db = firebaseApp.firestore();

export default db;
