import React, { useEffect, useState } from "react"; 
import { Navigate } from "react-router-dom";

const handleLocationSubmission = (e) => {
    e.preventDefault();
    window.location = `/metar/${e.target[0].value.toUpperCase()}`
};


function Home(props) {
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
            <h1>Insert Spinner Here</h1>
        ) : (
            <div>
                <div>
                    {isSignedIn ? (
                    <div>
                        <form onSubmit={handleLocationSubmission}>
                            <label label="location">Enter ICAO Code</label>
                            <input type="text" name="location"></input>
                            <input type="submit" value="Submit"></input>
                        </form>
                    </div>
                    ) : (
                    <Navigate to="/login" />
                    )}
                </div>
            </div>
        )}
    </div>
    );
}
export default Home;