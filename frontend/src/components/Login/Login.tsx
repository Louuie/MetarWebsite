import React, { useState} from "react";
import { Navigate } from "react-router-dom";
import {GoogleLogin, } from "react-google-login";
import env from "dotenv";

const clientId = process.env.googleClientID;

function Login() {
    const [showLoginButton, setLoginButton] = useState(true);
    const [showLogoutButton, setLogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        setLoginButton(false);
        setLogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log(res);
        setLogoutButton(true);
        setLogoutButton(false);
    };

    return (
        <div>
            {showLoginButton ? (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In" 
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                    />
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}

export default Login;