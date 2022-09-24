import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';

import { SearchId, SearchPw } from '../../index.js';
import { IoClose } from 'react-icons/io5';

function Login({ handleLogin, handleClose }) {
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');
  const [searchIdModal, setSearchIdModal] = useState(false);
  const [searchPwModal, setSearchPwModal] = useState(false);

  const changeId = () => {
    const idValue = document.getElementsByName('id')[0].value;
    setId(idValue);
  };
  const changePW = () => {
    const pwValue = document.getElementsByName('password')[0].value;
    setPassWord(pwValue);
  };
  const selectUserData = async (e) => {
    e.preventDefault();
    const idTrim = id.trim();
    const pwTrim = passWord.trim();

    if (idTrim === '') {
      return alert('아이디를 입력하세요');
    } else if (pwTrim === '') {
      return alert('비밀번호를 입력하세요');
    }

    const obj = { id: idTrim, password: pwTrim };
    const res = await axios('https://delivery-mate.herokuapp.com/send/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });

    if (res.data) {
      if (res.data.suc) {
        handleLogin(res.data);
        return alert(`안녕하세요 ${idTrim}님!`);
      } else {
        return alert(
          '아이디 및 비밀번호가 일치히지 않습니다. 다시 입력하세요!'
        );
      }
    }
  };
  const openSearchModal = (target) => {
    if (target === 'id') {
      setSearchIdModal(true);
    } else if (target === 'pw') {
      setSearchPwModal(true);
    }
  };
  const closeSearchModal = (target) => {
    if (target === 'id') {
      setSearchIdModal(false);
    } else if (target === 'pw') {
      setSearchPwModal(false);
    }
  };
  const backSearchModal = (target) => {
    closeSearchModal(target);
  };

  return (
    <>
      {searchIdModal ? (
        <SearchId
          backSearchModal={backSearchModal}
          target='id'
          handleClose={handleClose}
        ></SearchId>
      ) : searchPwModal ? (
        <SearchPw
          backSearchModal={backSearchModal}
          target='pw'
          handleClose={handleClose}
        ></SearchPw>
      ) : (
        <LoginContainer>
          <LoginTitle>
            <IoClose
              className='close-login-modal'
              onClick={() => handleClose()}
            ></IoClose>
          </LoginTitle>
          <form onSubmit={selectUserData}>
            <LoginBox>
              <h3>Log in</h3>
              <div className='login-input'>
                <input
                  type='text'
                  name='id'
                  placeholder='Id'
                  onChange={() => changeId()}
                ></input>
              </div>
              <div className='login-input'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={() => changePW()}
                ></input>
              </div>
              <div className='login-submit'>
                <input type='submit' value='LOGIN'></input>
              </div>
            </LoginBox>
          </form>
          <UserSearch>
            <div>
              <b onClick={() => openSearchModal('id')}>아이디 찾기</b>
            </div>
            <div>
              <b onClick={() => openSearchModal('pw')}>비밀번호 찾기</b>
            </div>
          </UserSearch>
        </LoginContainer>
      )}
    </>
  );
}

const LoginContainer = styled.div`
  padding: 25px;
  height: 100%;
`;
const LoginTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  h3 {
    color: #f27289;
  }
  .close-login-modal {
  }
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .login-input {
    display: flex;
    margin: 20px 20px 0 20px;
    input {
      width: 200px;
      height: 30px;
      padding: 8px;
      background-color: whitesmoke;
    }
  }
  .login-submit {
    margin-top: 30px;
    input {
      padding: 8px 15px;
      background-color: #bbf294;
      cursor: pointer;
      color: white;
      font-weight: 900;
      border-radius: 15px;
      line-height: 19px;
    }
  }
`;
const UserSearch = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  b {
    color: #ababab;
    font-size: 13px;
    cursor: pointer;
  }
`;

export default Login;
