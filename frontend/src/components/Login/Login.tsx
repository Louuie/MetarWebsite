import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { auth, detectTokenRevocation } from '../../firebase';
import axios from "axios";

const provider = new GoogleAuthProvider();

function Login() {
    const googleAuthenticate = () => {
        window.open('http://localhost:4000/auth/google');
    };

    const firebaseGoogleAuthentication = () => {
        signInWithPopup(auth, provider).then((res) => {
            const credential = GoogleAuthProvider.credentialFromResult(res);
            detectTokenRevocation(credential.idToken);
        }).catch((err) => { console.log(err); })     
    };

    useEffect(() => {

    })


    return (
        <div>
            <button type="button" onClick={firebaseGoogleAuthentication}>Login with Google</button> 
        </div>
    );
}

export default Login;