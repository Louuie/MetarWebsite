import React, { useEffect, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import {GoogleLogin, } from "react-google-login";
import env from "dotenv";

const clientId = "817352508433-svhmh1kd4bg80l1jb10g9kq91qkvslv6.apps.googleusercontent.com";

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
                <Link to="/"></Link>
            )}
        </div>
    );
}

export default Login;