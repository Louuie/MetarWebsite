import React, { useEffect, useState } from "react";
import "../../spinner.css";
import { Navigate } from "react-router-dom";


function User(props) {
    let isSignedIn = props.isSignedIn;
    let [isLoading, setLoadingStatus] = useState(true);

    useEffect(() => {
        setTimeout(
            function() {
                setLoadingStatus(false);
            }, 750)
    });

    return (
    <div>
        {isLoading ? (
                <div className="lds-ring">
                <div></div><div></div><div></div><div></div>
                </div>
        ) : (
            <div>
                {isSignedIn ? (
                            <div>
                                <img src={props.imageUrl} alt={props.fullName}/>
                                <h1>{props.fullName}</h1>
                                <h1>{props.email}</h1>
                            </div>
                ) : (
                    <Navigate to="/login" />
                )}
            </div>
        )}
    </div>
    );
}

export default User;