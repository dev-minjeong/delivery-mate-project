import './App.css';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './inc';
import { Main } from './page/index.js';

function App() {
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (sessionStorage.login && sessionStorage.IP) {
      setLogin(JSON.parse(sessionStorage.login).id);
      setAdmin(JSON.parse(sessionStorage.login).admin);
      setUserIp(JSON.parse(sessionStorage.IP));
    }
  }, []);

  const handleLogin = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc));
    sessionStorage.setItem('IP', JSON.stringify(data.ip));
    setLogin(JSON.parse(sessionStorage.login).id);
    setAdmin(JSON.stringify(data.suc).admin);
    setUserIp(JSON.parse(sessionStorage.IP));
    return window.location.reload();
  };
  const handleLogout = () => {
    setLogin(false);
    setAdmin(false);
    setUserIp('');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('IP');
  };
  return (
    <div className='App'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header
          login={login}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        ></Header>
        <Main login={login} admin={admin} userIp={userIp}></Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
