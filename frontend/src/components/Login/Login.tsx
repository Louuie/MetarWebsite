import React, { useEffect } from "react";
import { firebaseAuth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import axios from "axios";

const provider = new GoogleAuthProvider();

function Login() {
    const googleAuthenticate = () => {
        window.open('http://localhost:4000/auth/google');
    };

    const firebaseGoogleAuthentication = () => {
        signInWithPopup(firebaseAuth, provider).then((res) => {
            const credential = GoogleAuthProvider.credentialFromResult(res);
            console.log(res);
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