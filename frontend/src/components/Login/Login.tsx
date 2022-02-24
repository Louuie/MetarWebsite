import React, {Children, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import env from "react-dotenv";
import {GoogleLogin, GoogleLogout } from "react-google-login";
import Home from "../Home/Home";
function Login(props) {
    const [showLoginButton, setLoginButton] = useState(true);
    const [showLogoutButton, setLogoutButton] = useState(false);
    const clientId = "817352508433-svhmh1kd4bg80l1jb10g9kq91qkvslv6.apps.googleusercontent.com";

    const onLoginSuccess = (res) => {
        setLoginButton(false);
        setLogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log(res);
        setLogoutButton(true);
        setLogoutButton(false);
    };

    const onSignoutSuccess = () => {
        alert("You have been logout of your Google Account!");
        setLoginButton(true);
        setLogoutButton(false);
    };

    const redirectAfterLogin = () => {
        console.log("Hello!");
        window.location.reload();
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
                <NavLink to="/" onClick={redirectAfterLogin}>Please go to the home page</NavLink>
            )}
        </div>
    );
}

export default Login;