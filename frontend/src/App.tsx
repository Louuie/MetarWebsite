import Home from './components/Home/Home.tsx';
import Metar from './components/Airport/Metar.tsx'
import Login from './components/Login/Login.tsx'
import User from './components/User/User.tsx';
import {firebaseAuth} from './firebase';
import { Suspense, useEffect, useState } from 'react';
import {Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Airport from './components/Airport/Airport.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import "./spinner.css";
import axios from 'axios';
import Spinner from './spinner.tsx';


function App() {

  let [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true');
  let [token, setToken] = useState(null);
  let unmounted = false;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if(!unmounted && user) {
        user.getIdToken().then((token) => setToken(token));
        isValidToken();
      } else setAuth(false);
    });
    return () => { unmounted = true; }
  });

  const isValidToken = () => {
    axios.get('http://localhost:4000/auth/status', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      if(!unmounted) {
        if(response.data.error == undefined || response.data.error == null && response.data.isAuthenticated == true) { setAuth(true); window.localStorage.setItem('auth', 'true')} else setAuth(false);
      }
    }).catch((err) => console.log(err))
  };


  return (
    <>
    <Suspense fallback={<Spinner />}>
      {auth ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User token={token} />} />
                <Route path="/metar/:airport" element={<Metar />} />
                <Route path="/:airport" element={<Airport />} />
              </Routes>
      ) : (
        <>
          <NavLink to="/login" children={<Login />} />
        </>
      )}
      </Suspense>
    </>
  );
}

export default App;
