import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";                  
import lodash from "lodash";


function User() {
    let [isLoading, setLoadingStatus] = useState(true); 
    let [firstName, setFirstName] = useState(null);
    let [lastName, setLastName] = useState(null);
    let [email, setEmail] = useState(null);
    let [profile_picture, set_profile_picture] = useState(null);
    let [errorCodeStatus, setErrorCodeStatus] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/auth/user/information", {withCredentials: true}).then((res) => {
            if(res.data.name === undefined) setErrorCodeStatus(true); else  setErrorCodeStatus(false); 
            setFirstName(res.data.name.familyName);
            setLastName(res.data.name.givenName);
            setEmail(res.data.emails.main);
            set_profile_picture(res.data.profile_picture.value);
        }).catch((err) => { console.log(err) })
        setTimeout(
            function() {
                setLoadingStatus(false);
            }, 1400)
    });                     

    return (
    <div>
        {isLoading ? (
                <div className="lds-ring">
                <div></div><div></div><div></div><div></div>
                </div>
        ) : (
            <div>
                {errorCodeStatus ? (
                    <div>
                        <Link to="/login">Login in Please</Link>
                    </div>
                ) : (
                    <div>
                    <img src={profile_picture} alt={firstName} />
                    <h1>{firstName} {lastName}</h1>
                    <h1>{email}</h1>
                    </div>
                )}
            </div>
        )}
    </div>
    );
}

export default User;