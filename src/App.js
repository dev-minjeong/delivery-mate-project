import './App.css';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './inc';
import { Main } from './page/index.js';

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.login) {
      setLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setLogin(true);
    return sessionStorage.setItem('login', true);
  };
  const handleLogout = () => {
    setLogin(false);
    return sessionStorage.removeItem('login');
  };
  console.log(login);
  return (
    <div className='App'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header
          login={login}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        ></Header>
        <Main login={login}></Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
