import Modal from 'react-awesome-modal';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import '../App.css';
import { SearchId, SearchPw } from './index.js';

function Login({ handleLogin, loginModal, toggleModal }) {
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
    const idTrim = id.trim();
    const pwTrim = passWord.trim();

    if (idTrim === '') {
      return alert('아이디를 입력하세요');
    } else if (pwTrim === '') {
      return alert('비밀번호를 입력하세요');
    }

    const obj = { id: idTrim, password: pwTrim };
    const res = await axios('/send/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });

    if (res.data) {
      if (res.data.suc) {
        // sessionStorage.setItem('login', true);
        // setLogin(true);
        handleLogin(res.data);
        toggleModal(false);
        // closeModal();
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
    return toggleModal(false);
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
    return toggleModal(true);
  };

  return (
    <div>
      <Modal
        visible={loginModal}
        width='400'
        height='350'
        effect='fadeInDown'
        onClickAway={() => toggleModal(false)}
      >
        <div className='acenter'>
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
                  type='password'
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
                    onClick={() => toggleModal(false)}
                  ></input>
                </div>
              </div>
            </div>
          </form>
          <div className='search-user-info'>
            <div>
              <b onClick={() => openSearchModal('id')}>아이디 찾기</b>
            </div>
            <div>
              <b onClick={() => openSearchModal('pw')}>비밀번호 찾기</b>
            </div>
          </div>
        </div>
      </Modal>
      <SearchId
        searchIdModal={searchIdModal}
        closeSearchModal={closeSearchModal}
        backSearchModal={backSearchModal}
        target='id'
      ></SearchId>
      <SearchPw
        searchPwModal={searchPwModal}
        closeSearchModal={closeSearchModal}
        backSearchModal={backSearchModal}
        target='pw'
      ></SearchPw>
    </div>
  );
}
export default Login;
