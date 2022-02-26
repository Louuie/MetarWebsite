import React, {useEffect, useState} from "react";
import axios from 'axios';
import lodash from 'lodash';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Metar.css';
import "../../spinner.css";

function Metar(props) {
    let params = useParams();
    let padded_wind_direction
    let [isLoading, setLoadingStatus] = useState(true);
    let [icao_code, set_icao_code] = useState(params.airport); 
    let [airportName, setAirportName] = useState(null);
    let [airportLocation, setAirportLocation] = useState(null);
    let [airport_raw_text, set_airport_raw_text] = useState(null);
    let [airport_temperature_in_celsius, set_airport_temperature_in_celsius] = useState(null);
    let [airport_temperature_in_fahrenheit, set_airport_temperature_in_fahrenheit] = useState(null);
    let [flight_category, set_flight_category] = useState(null);
    let [wind_direction, set_wind_direction] = useState(null);
    let [wind_speed, set_wind_speed] = useState(null);
    let [clouds, setClouds] = useState(null);
    let [altimeter, setAltimeter] = useState(null);

    let isSignedIn = props.isSignedIn; 


    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4000/metar?icao=${icao_code}`);
        const data = await res.data;
        set_icao_code(data.icao);
        setAirportName(data.station.name);
        setAirportLocation(data.station.location);
        set_airport_raw_text(data.raw_text);
        set_flight_category(data.flight_category);
        if(data.temperature.celsius === undefined && data.temperature.fahrenheit === undefined) { 
            set_airport_temperature_in_celsius(data.temperature.minimum.celsius);
            set_airport_temperature_in_fahrenheit(data.temperature.minimum.fahrenheit);
         } else { 
                set_airport_temperature_in_celsius(data.temperature.celsius); 
                set_airport_temperature_in_fahrenheit(data.temperature.fahrenheit); 
            }
        if(data.wind.degrees >= 100) { set_wind_direction(data.wind.degrees); } else {
            padded_wind_direction = data.wind.degrees.toString();
            set_wind_direction(padded_wind_direction.padStart(3, '0'));
        }
        set_wind_speed(data.wind.speed_kts);
        setClouds(data.clouds[0].text);
        setTimeout(
            function() {
                setLoadingStatus(false);
            }, 1250)
    };


    useEffect(() => {
        fetchData()
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
        <>
          <main>
              {isLoading ? (
                    <div className="lds-ring">
                    <div></div><div></div><div></div><div></div>
                    </div>
              ) : (
                <div>
                    {!isSignedIn ? (
                        <Navigate to="/login" />
                    ) : (
                        <div>
                            {lodash.isEmpty(icao_code) ? (
                                <h1>That airport does not exist!</h1>
                            ) : (
                                <div>
                                    <div>
                                        <Link to={`/${icao_code}`}>{icao_code} </Link> <br></br>
                                        <Link to={`/metar/${icao_code}`} onClick={(()=> window.location.reload())}>Metar
                                        </Link>
                                    </div>
                                    <h1>{icao_code}</h1>
                                    <div>
                                        <h2>{airportName}</h2>
                                        <h3>{airportLocation}</h3>
                                    </div>
                                    <div>
                                        <div className="metarTitle">
                                            <h3>METAR - Current</h3>
                                        </div>
                                        <div className="metarTable">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={2}>
                                                            <p>{airport_raw_text}</p>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Flight Category</th>
                                                        <td>
                                                            <span className="badge text-white">
                                                                {flight_category}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Wind</th>
                                                        <td>
                                                            {wind_direction}° at {wind_speed} KTS
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Temperature</th>
                                                        <td>
                                                            {airport_temperature_in_celsius}° C /
                                                            {airport_temperature_in_fahrenheit}° F
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Clouds</th>
                                                        <td>
                                                            {clouds}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Alitmeter</th>
                                                        <td>{}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
            </div>
          )}
          </main>
        </>
    );
}



export default Metar;
