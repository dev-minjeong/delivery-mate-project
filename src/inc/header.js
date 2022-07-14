import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import Modal from 'react-awesome-modal';

function Header() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');
  const [login, setLogin] = useState(false);
  // const [data, setData] = useState('');

  useEffect(() => {
    if (sessionStorage.login) {
      setLogin(true);
    }
  }, []);

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

  const selectUserData = async (e) => {
    const idTrim = id.trim();
    const pwTrim = passWord.trim();

    if (idTrim === '') {
      return alert('아이디를 입력하세요');
    } else if (pwTrim === '') {
      return alert('비밀번호를 입력해주세요');
    }

    const obj = { id: idTrim, password: pwTrim };
    const res = await axios('/send/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });

    if (res.data) {
      console.log(res.data.msg);

      if (res.data.suc) {
        sessionStorage.setItem('login', true);
        setLogin(true);
        closeModal();
      }
    }
  };

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sessionStorage.removeItem('login');
      setLogin(false);
    }
  };

  return (
    <div className='header'>
      <div></div>
      <div className='logo btn-cusor'>
        <Link className='link-title' to='/'>
          <h3>Delivery Mate App</h3>
        </Link>
      </div>
      <div className='login'>
        {login ? (
          <h5 className='btn-cursor' onClick={() => logout()}>
            관리자 로그아웃
          </h5>
        ) : (
          <h5 className='btn-cursor' onClick={() => openModal()}>
            관리자 로그인
          </h5>
        )}
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
                    <input
                      type='button'
                      value='로그인'
                      onClick={() => selectUserData()}
                    ></input>
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
