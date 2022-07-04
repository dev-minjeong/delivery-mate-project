import { Route, Link, Routes } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

import Modal from 'react-awesome-modal';

function Header() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');

  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const changeId = () => {
    const idValue = document.getElementsByName('id')[0].value;
    setId(idValue);
  };
  const changePW = () => {
    const pwValue = document.getElementsByName('password')[0].value;
    setPassWord(pwValue);
  };

  useEffect(() => {
    console.log(`아이디: ${id} 비밀번호: ${passWord}`);
  });

  return (
    <div className='header'>
      <div></div>
      <div className='logo'>
        <Routes>
          <Route path='/'></Route>
        </Routes>

        <Link className='link-title' to='/'>
          <h3>Delivery Mate App</h3>
        </Link>
      </div>
      <div className='login'>
        <h5 onClick={() => openModal()}>로그인</h5>
        <Modal
          visible={visible}
          width='400'
          height='300'
          effect='fadeInDown'
          onClickAway={() => closeModal()}
        >
          <div>
            <h4 className='login login-title'>로그인</h4>
            <form>
              <div className='login-div'>
                <div className='login-input'>
                  <p>아이디</p>
                  <input
                    type='text'
                    name='id'
                    onChange={() => changeId()}
                  ></input>
                </div>
                <div className='login-input'>
                  <p>비밀번호</p>
                  <input
                    type='text'
                    name='password'
                    onChange={() => changePW()}
                  ></input>
                </div>
                <div className='login-submit'>
                  <div>
                    <input type='button' value='로그인'></input>
                  </div>
                  <div>
                    <input
                      type='button'
                      value='취소'
                      onClick={() => closeModal()}
                    ></input>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Header;
