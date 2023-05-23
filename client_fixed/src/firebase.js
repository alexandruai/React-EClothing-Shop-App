import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

// Configurarile de Firebase din platforma Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLfaopZSud1zdniaRQjkeyM3_lhG8N1mw",
  authDomain: "clothes-online-shop.firebaseapp.com",
  projectId: "clothes-online-shop",
  storageBucket: "clothes-online-shop.appspot.com",
  messagingSenderId: "683128525548",
  appId: "1:683128525548:web:1ac2d9ddfe8b1302634bc9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();