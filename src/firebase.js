import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp6mDUYbO4wADInCO3PbcMx1LmWLMqgNY",
  authDomain: "ecommerce-173c7.firebaseapp.com",
  projectId: "ecommerce-173c7",
  storageBucket: "ecommerce-173c7.appspot.com",
  messagingSenderId: "90316764210",
  appId: "1:90316764210:web:e8b271e808c88eb278382b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
