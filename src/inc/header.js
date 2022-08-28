import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import '../App.css';

import { Login } from './index.js';

const Header = ({
  login,
  admin,
  userIp,
  handleLogin,
  handleLogout,
  loginModal,
  toggleModal,
}) => {
  const openModal = () => {
    return toggleModal(true);
  };
  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      handleLogout();

      sessionStorage.removeItem('page');
      sessionStorage.setItem('cagtegory', '');
      return (window.location.href = '/');
    }
  };
  const handleHeader = () => {
    window.location.href = '/';
    sessionStorage.removeItem('page');
    sessionStorage.setItem('category', '');
  };
  return (
    <div className='header'>
      <div className='write'>
        {login ? (
          <h5>
            <Link to='/write'>게시글 작성</Link>
          </h5>
        ) : null}
      </div>
      <div className='logo btn-cusor'>
        <Routes>
          <Route path='/' />
        </Routes>
        <h3 className='link-title' onClick={() => handleHeader()} to='/'>
          Delivery Mate App
        </h3>
      </div>
      <div className='login'>
        <ul className='login-list'>
          {login ? (
            <li className='btn-cursor' onClick={() => logout()}>
              로그아웃
            </li>
          ) : (
            <li className='btn-cursor' onClick={() => openModal()}>
              로그인
            </li>
          )}
          <Login
            handleLogin={handleLogin}
            loginModal={loginModal}
            toggleModal={toggleModal}
          />
          {!login ? (
            <li>
              <Link to='signup'>회원가입</Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
export default Header;
