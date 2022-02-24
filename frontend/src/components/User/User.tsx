import React from "react";

function User(props) {
    return (
        <div>
            <img src={props.imageUrl} />
            <h1>{props.fullName}</h1>
            <h1>{props.email}</h1>
        </div>
    );
}

export default User;