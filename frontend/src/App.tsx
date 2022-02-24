import Home from './components/Home/Home.tsx';
import Metar from './components/Airport/Metar.tsx'
import Login from './components/Login/Login.tsx'
import User from './components/User/User.tsx';
import { useGoogleLogin } from 'react-google-login';
import { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import env from "dotenv";
import './App.css';
import Airport from './components/Airport/Airport.tsx';

// TODO - Figure out a way to store this clientID in an env file
const clientId = "817352508433-svhmh1kd4bg80l1jb10g9kq91qkvslv6.apps.googleusercontent.com";

function App() {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState<any | null>(null);
  const [userEmail, setUserEmail] = useState<any | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<any | null>(null);

  const onLoginSuccess = (res) => {
      if(res.profileObj) {
          setLoginStatus(true);
          setUserName(res.profileObj.name);
          setUserEmail(res.profileObj.email);
          setUserImageUrl(res.profileObj.imageUrl);
      } else { setLoginStatus(false); }
  };
  
  const onLoginFailure = (res) => {
      console.log(res);
  };

  const { signIn, loaded } = useGoogleLogin({
      onSuccess: onLoginSuccess,
      onFailure: onLoginFailure,
      isSignedIn: true,
      clientId: clientId
  });

  return (
      <Routes>
            <>
            // TODO Implement the isSignedIn prop in user & airport components
                <Route path="/" element={<Home isSignedIn={isLoggedIn}/>} />
                <Route path="/user" element={<User isSignedIn={isLoggedIn} fullName={userName} email={userEmail} imageUrl={userImageUrl} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/metar/:airport" element={<Metar isSignedIn={isLoggedIn} />} />
                <Route path="/:airport" element={<Airport isSignedIn={isLoggedIn} />} />
            </>
      </Routes>
  );
}

export default App;
