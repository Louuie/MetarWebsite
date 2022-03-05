import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebase";
import { onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import '../Login/Login';                  
import Login from "../Login/Login";


function User({token}) {
    let [fullName, setFullName] = useState(null);
    let [email, setEmail] = useState(null);
    let [profile_picture, set_profile_picture] = useState(null);

    
    
    useEffect(() => {
        let unmounted = false;
        onAuthStateChanged(firebaseAuth, (user) => {
            if(!unmounted && user) {
                                user.getIdToken().then((token) => {
                    axios.get('http://localhost:4000/auth/user/information', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then((res) => {
                        if(res.data == undefined) <Login/>
                        setFullName(res.data.fullName);
                        setEmail(res.data.email);
                        set_profile_picture(res.data.profile_picture);
                    }).catch((err) => console.log(err));
                });
            }
        })
        return () => {unmounted = true};
    });



    return (
            <div>
                <img src={profile_picture} alt={fullName} />
                <h1>{fullName}</h1>
                <h1>{email}</h1>
            </div>
    );
}

export default User;