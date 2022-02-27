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
import "./spinner.css";


function App() {
  

  return (
      <Routes>
            <>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/metar/:airport" element={<Metar />} />
                <Route path="/:airport" element={<Airport />} />
            </>
      </Routes>
  );
}

export default App;
