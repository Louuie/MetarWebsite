import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import lodash from 'lodash';
import { useParams, Link, Navigate } from 'react-router-dom';

function Airport(props) {
    let params = useParams();
    let isSignedIn = props.isSignedIn;
    let [isLoading, setLoadingStatus] = useState(true);
    let [icao_code, set_icao_code] = useState(params.airport);
    let [airportName, setAirportName] = useState(null);
    let [airportLocation, setAirportLocation] = useState(null);
    let [airportLongitude, setAirportLongitude] = useState(null);
    let [airportLatitude, setAirportLatitude] = useState(null);
    const lat = airportLatitude;
    const long = airportLongitude;
    const map = {
        center: {
          lat: lat,
          lng: long
        },
        zoom: 14
      };

    useEffect(() => {
        axios.get(`http://localhost:4000/metar?icao=${icao_code}`)
        .then((res) => {
            set_icao_code(res.data.icao);
            setAirportName(res.data.station.name);
            setAirportLocation(res.data.station.location);
            setAirportLongitude(res.data.station.geometry.coordinates[0]);
            setAirportLatitude(res.data.station.geometry.coordinates[1]);
            setTimeout(function() {
                setLoadingStatus(false);
            }, 750)
        }).catch((err) => { console.log(err); });
    });

    return (
        <main>
            {isLoading ? (
                    <div className="lds-ring">
                    <div></div><div></div><div></div><div></div>
                    </div>
            ) : (
            <div>
                {isSignedIn ? (
                    <div>
                        {!lodash.isEmpty(icao_code) ? (
                            <div>
                                <div>
                                    <h1>{icao_code}</h1>
                                </div>
                                <div>
                                    <h2>{airportName}</h2>
                                    <h2>{airportLocation}</h2>
                                </div>
                                <div style={{ height: '50vh', width: '50%' }}>
                                    <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyDt9vPcQ0Lz7XfQKUr6UgtgXMD83-tjw0Y"}}
                                        center={map.center} zoom={map.zoom}>
                                    </GoogleMapReact>
                                </div>
                            </div>
                        ) : (
                            <h1>That airport does not exist!</h1>
                        )}
                    </div>
                ) : (
                    <Navigate to="/login" />
                )}
            </div>
            )}
        </main>
    );
}

export default Airport;