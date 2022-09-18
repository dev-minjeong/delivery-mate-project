import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { IoRemove } from 'react-icons/io5';
import { FiAtSign } from 'react-icons/fi';

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6vh;
  #signup-title {
    color: #454545;
    font-family: 'nanumEb';
    font-weight: 900;
  }
  .signup-info-box {
    display: flex;
    flex-wrap: wrap;
  }
`;
const SignUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  padding-top: 20px;
  .signup-input {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 220px;
      padding: 10px;
      margin-top: 5px;
      border: 2px solid #bbf294;
      border-radius: 2px;
      height: 35px;
      background-color: inherit;
    }
  }
  .signup-bday div {
    font-size: 15px;
    input:first-child {
      width: 100px;
    }
    svg {
      margin: 0 3px;
    }
    input:last-child {
      width: 35px;
    }
  }
  .email {
    input {
      width: 100px;
    }
    div {
      display: flex;
      flex-direction: row;
      svg {
        margin: 12px 5px 0 5px;
      }
      .email-input {
        display: flex;
        flex-direction: column;
      }
      select {
        width: 95px;
        margin-top: 5px;
        height: 35px;
        padding: 5px;
      }
    }
  }
  .input-warn {
    font-size: 10px;
    color: red;
  }
`;
const SignUpSubmit = styled.div`
  margin-top: 8vh;
  input {
    font-size: 16px;
    font-weight: 900;
    padding: 13px;
    border-radius: 2px;
    background-color: #bbf294;
    color: white;
    cursor: pointer;
    width: 180px;
    height: 50px;
  }
`;

const SignUp = ({ setPageLeft, setPageMain }) => {
  const [emailWriter, setEmailWriter] = useState(false);
  const [input, setInput] = useState(false);
  const [currName, setCurrName] = useState('');

  useEffect(() => {
    setPageLeft(false);
    setPageMain(true);
  }, []);

  const changeEmailSelect = () => {
    const select = document.getElementsByName('signup-email-select')[0].value;

    if (select === 'write') {
      setEmailWriter(true);
    } else {
      setEmailWriter(false);
    }
  };
  const signup = async () => {
    const id = document.getElementsByName('signup-id')[0].value.trim();
    const pw = document.getElementsByName('signup-pw')[0].value.trim();
    const pwCheck = document
      .getElementsByName('signup-pwCheck')[0]
      .value.trim();
    const name = document.getElementsByName('signup-name')[0].value.trim();
    const bday = document.getElementsByName('signup-bday')[0].value.trim();
    const sex = document.getElementsByName('signup-sex')[0].value.trim();

    const emailId = document.getElementsByName('signup-email')[0].value.trim();
    let emailSelect = document.getElementsByName('signup-email-select')[0]
      .value;

    if (emailSelect === 'write') {
      emailSelect = document
        .getElementsByName('signup-email-write')[0]
        .value.trim();
    }
    const email = emailId + '@' + emailSelect;

    // 아이디, 비번이 영문자로 시작하고, 숫자를 포함, 6-20글자수인지 확인
    const checkId = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!checkId.test(id)) {
      return alert('아이디를 다시 입력하세요');
    }
    const checkPw = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!checkPw.test(pw)) {
      return alert('비밀번호를 다시 입력하세요');
    } else if (pw !== pwCheck) {
      return alert('비밀번호가 일치하지 않습니다');
    }
    if (name.length === 0 || name.length < 2) {
      return alert('이름/닉네임을 다시 입력하세요');
    } else if (bday.length < 6 || sex.length === 0) {
      return alert('생년월일을 모두 입력하세요');
    } else if (isNaN(Number(bday)) || isNaN(Number(sex))) {
      return alert('생년월일은 숫자로만 입력 가능합니다');
    }
    // 올바른 형태의 이메일 확인
    const emailCheck =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!email.match(emailCheck)) {
      return alert('이메일을 올바른 형식으로 입력하세요');
    }

    const data = {
      id: id,
      password: pw,
      name: name,
      birthday: bday,
      sex: sex,
      email: email,
    };
    const addUser = await axios('/add/user', {
      method: 'POST',
      headers: new Headers(),
      data: data,
    });
    if (!addUser.data) {
      return alert('이미 존재하는 아이디 입니다');
    } else {
      alert(`${name}님 회원가입이 완료되었습니다!`);
      return (window.location.href = '/');
    }
  };
  const inputChange = (name) => {
    const change = document.getElementsByName(name)[0].value.length;
    if (change > 0) {
      setInput(true);
    } else {
      setInput(false);
    }
  };
  const currFocus = (name) => {
    setCurrName(name);
  };
  return (
    <SignUpBox>
      <h3 id='signup-title'>Sign up</h3>
      <div className='signup-info-box'>
        <SignUpInfo>
          <div className='signup-input'>
            <h5>아이디</h5>
            <input
              type='text'
              maxLength='20'
              name='signup-id'
              onChange={() => inputChange('signup-id')}
              onFocus={() => currFocus('signup-id')}
            ></input>
            {currName === 'signup-id' ? (
              !input ? (
                <label className='input-warn'>
                  아이디는 영문자로 시작하며, 숫자를 포함해 6~20자 입니다
                </label>
              ) : null
            ) : null}
          </div>
          <div className='signup-input'>
            <h5>비밀번호</h5>
            <input
              type='password'
              maxLength='10'
              name='signup-pw'
              onChange={() => inputChange('signup-pw')}
              onFocus={() => currFocus('signup-pw')}
            ></input>
            {currName === 'signup-pw' ? (
              !input ? (
                <label className='input-warn'>
                  비밀번호는 영문자로 시작하며, 숫자를 포함해 6~20자 입니다
                </label>
              ) : null
            ) : null}
          </div>
          <div className='signup-input'>
            <h5>비밀번호 확인</h5>
            <input type='password' maxLength='10' name='signup-pwCheck'></input>
          </div>
        </SignUpInfo>
        <SignUpInfo>
          <div className='signup-input'>
            <h5>이름 또는 닉네임</h5>
            <input
              type='text'
              maxLength='10'
              name='signup-name'
              onChange={() => inputChange('signup-name')}
              onFocus={() => currFocus('signup-name')}
            ></input>
            {currName === 'signup-name' ? (
              !input ? (
                <label className='input-warn'>
                  이름/닉네임은 2자 이상 입니다
                </label>
              ) : null
            ) : null}
          </div>
          <div className='signup-bday signup-input'>
            <h5>생년월일</h5>
            <div>
              <input type='text' maxLength='6' name='signup-bday' />
              <IoRemove></IoRemove>
              <input type='text' maxLength='1' name='signup-sex' /> * * * * * *
            </div>
          </div>
          <div className='email signup-input'>
            <h5>이메일</h5>
            <div>
              <input type='text' maxLength='15' name='signup-email' />
              <FiAtSign></FiAtSign>
              <div className='email-input'>
                {emailWriter ? (
                  <input
                    type='text'
                    name='signup-email-write'
                    maxLength='20'
                  ></input>
                ) : null}
                <select
                  name='signup-email-select'
                  onChange={() => changeEmailSelect()}
                >
                  <option value='gmail.com'>gmail.com</option>
                  <option value='naver.com'>naver.com</option>
                  <option value='write'>직접입력</option>
                </select>
              </div>
            </div>
          </div>
        </SignUpInfo>
      </div>
      <SignUpSubmit>
        <input
          type='button'
          value='가입하기'
          name='signup-submit'
          onClick={() => signup()}
        ></input>
      </SignUpSubmit>
    </SignUpBox>
  );
};
export default SignUp;
