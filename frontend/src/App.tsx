import Home from './components/Home/Home.jsx';
import Metar from './components/Airport/Metar.jsx'
import Login from './components/Login/Login.tsx'
import User from './components/User/User.tsx';
import { useGoogleLogin } from 'react-google-login';
import { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Airport from './components/Airport/Airport.tsx';

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
      clientId: "817352508433-svhmh1kd4bg80l1jb10g9kq91qkvslv6.apps.googleusercontent.com"
  });

  return (
      <Routes>
          {isLoggedIn ? (
              <><Route path="/" element={<Home />} /><Route path="/:airport" element={<Airport />} /><Route path="/user" element={<User fullName={userName} email={userEmail} imageUrl={userImageUrl}/>} /><Route path="/metar/:airport" element={<Metar />} /></>
          ) : (
              <Route path="*" element={<Login />} />
          )}
      </Routes>
  );
}

export default App;
