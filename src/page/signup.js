import './main.css';
import { useState } from 'react';

function SignUp() {
  const [emailWriter, setEmailWriter] = useState(false);
  const changeEmailSelect = () => {
    const select = document.getElementsByName('signup-email-select')[0].value;

    if (select === 'write') {
      setEmailWriter(true);
    } else {
      setEmailWriter(false);
    }
  };
  return (
    <div>
      <div className='signup'>
        <h3 id='signup-title'>회원가입</h3>
        <div>
          <h5>아이디</h5>
          <input type='text' maxLength='20' name='signup-id'></input>
        </div>
        <div>
          <h5>비밀번호</h5>
          <input type='password' maxLength='10' name='signup-pw'></input>
        </div>
        <div>
          <h5>비밀번호 확인</h5>
          <input type='password' maxLength='10' name='signup-pwCheck'></input>
        </div>
        <div>
          <h5>이름</h5>
          <input type='text' maxLength='10' name='signup-name'></input>
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
        <input type='button' value='가입하기' name='signup-submit'></input>
      </div>
    </div>
  );
}
export default SignUp;
