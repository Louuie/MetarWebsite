import React, { useState} from "react";
import axios from "axios";


function Login() {
    const googleAuthenticate = () => {
        window.open('http://localhost:4000/auth/google');
    };


    return (
        <div>
            <button type="button" onClick={googleAuthenticate}>Login with Google</button> 
        </div>
    );
}

export default Login;