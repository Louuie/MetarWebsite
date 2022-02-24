import React from "react";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = (props) => {
    const user = { loggedIn: props.loginStatus };
    console.log(user);
    if(user.loggedIn) {
        return <Outlet />
    } else { return <Navigate replace to="/login" /> }
};

export default ProtectedRoute;