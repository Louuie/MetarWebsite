import React from "react"; 

const handleLocationSubmission = (e) => {
    e.preventDefault();
    window.location = `/metar/${e.target[0].value.toUpperCase()}`
};


function Home(props) {
    return (
        <div>
            <div>
                <form onSubmit={handleLocationSubmission}>
                    <label label="location">Enter ICAO Code</label>
                    <input type="text" name="location"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    );
}
export default Home;