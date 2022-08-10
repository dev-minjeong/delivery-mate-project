import './main.css';
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [emailWriter, setEmailWriter] = useState(false);
  const [input, setInput] = useState(false);
  const [focus, setFocus] = useState(false);
  const [currName, setCurrName] = useState('');

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
    // const email = `${emailId}@ ${emailSelect}`;
    const email = emailId + '@' + emailSelect;

    // 정규표현식
    // 아이디, 비번이 영문자로 시작하고, 6-20글자수인지 확인
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
    // 올바른 형태의 이메일 확인
    if (name.length === 0 || name.length < 2) {
      return alert('이름을 다시 입력하세요');
    } else if (bday.length < 6 || sex.length === 0) {
      return alert('생년월일을 모두 입력하세요');
    } else if (isNaN(Number(bday)) || isNaN(Number(sex))) {
      return alert('생년월일은 숫자로만 입력 가능합니다');
    }

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
    <div>
      <div className='signup'>
        <h3 id='signup-title'>회원가입</h3>
        <div>
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
                아이디는 영문자로 시작하며, 6~20자 입니다
              </label>
            ) : null
          ) : null}
        </div>
        <div>
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
                비밀번호는 영문자로 시작하며, 6~20자 입니다
              </label>
            ) : null
          ) : null}
        </div>
        <div>
          <h5>비밀번호 확인</h5>
          <input type='password' maxLength='10' name='signup-pwCheck'></input>
        </div>
        <div>
          <h5>이름</h5>
          <input
            type='text'
            maxLength='10'
            name='signup-name'
            onChange={() => inputChange('signup-name')}
            onFocus={() => currFocus('signup-name')}
          ></input>
          {currName === 'signup-name' ? (
            !input ? (
              <label className='input-warn'>이름은 2자 이상 입니다</label>
            ) : null
          ) : null}
        </div>
        <div className='signup-bday'>
          <h5>생년월일</h5>
          <div>
            <input type='text' maxLength='6' name='signup-bday' />-
            <input type='text' maxLength='1' name='signup-sex' /> ******
          </div>
        </div>
        <div className='email'>
          <h5>이메일</h5>
          <div>
            <input type='text' maxLength='15' name='signup-email' />@
            <select
              name='signup-email-select'
              onChange={() => changeEmailSelect()}
            >
              <option value='gmail.com'>gmail.com</option>
              <option value='naver.com'>naver.com</option>
              <option value='write'>직접입력</option>
            </select>
          </div>

          {emailWriter ? (
            <input type='text' name='signup-email-write' maxLength='20'></input>
          ) : null}
        </div>
        {/* <div id='signup-section'> </div> */}
      </div>
      <div className='signup-submit'>
        <input
          type='button'
          value='가입하기'
          name='signup-submit'
          onClick={() => signup()}
        ></input>
      </div>
    </div>
  );
}
export default SignUp;
