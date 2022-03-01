// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdPfcWMLvX9aB4OEZi71G4c4ysKk9_cAI",
  authDomain: "metar-login.firebaseapp.com",
  projectId: "metar-login",
  storageBucket: "metar-login.appspot.com",
  messagingSenderId: "539073788201",
  appId: "1:539073788201:web:b2f016c1aabb9be8ce1f38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const detectTokenRevocation = (token) => {
  let checkRevoked = true;
  auth.verifyIdToken(token, checkRevoked).then((payload) => {
    console.log("Valid Token");
  }).catch((err) => { 
    if(err.code === 'auth/id-token-revoked') {
      console.log("Token has been revoked, please reauthenticate!");
    } else { console.log("Token is invalid!") }
   })
};






