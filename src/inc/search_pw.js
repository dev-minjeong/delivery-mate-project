import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-awesome-modal';
import styled from 'styled-components';

import { BackAndClose } from './index.js';

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-info {
    display: flex;
    width: 300px;
    margin-top: 25px;
    h5 {
      margin-right: 7px;
    }
  }
  .id {
    margin-top: 40px;
    input {
      width: 218px;
    }
  }
  .email {
    input {
      width: 100px;
    }
    input:nth-child(3) {
      width: 88px;
    }
  }
  input {
    background-color: whitesmoke;
    margin: 0 7px;
    height: 27px;
    padding: 7px;
  }
`;
const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .search-pw-result {
    width: 290px;
    margin-top: 10px;
  }
  .input-number-div {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }
  .input-number {
    background-color: whitesmoke;
    height: 35px;
    padding: 7px;
    width: 200px;
  }
`;
const ChangePwBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .change-pw-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
    width: 350px;
    span {
      font-size: 13px;
    }
    b {
      color: red;
    }
  }
  .input-pw {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    h5 {
      margin: 7px 18px 7px 7px;
    }
    input {
      background-color: whitesmoke;
      height: 35px;
      padding: 7px;
      width: 200px;
    }
  }
`;
const SearchSubmit = styled.div`
  margin-top: 48px;
  align-items: center;
  input {
    padding: 8px 15px;
    background-color: #bbf294;
    cursor: pointer;
    color: white;
    font-weight: 900;
    border-radius: 15px;
    height: 34px;
  }
`;
const EnterSubmit = styled.div`
  align-items: center;
  input {
    padding: 8px 15px;
    background-color: #bbf294;
    cursor: pointer;
    color: white;
    font-weight: 900;
    border-radius: 15px;
    height: 34px;
  }
`;
function SearchPw({
  searchPwModal,
  closeSearchModal,
  backSearchModal,
  target,
}) {
  const [result, setResult] = useState(false);
  const [secret, setSecret] = useState('');
  const [userData, setUserData] = useState('');
  const [change, setChange] = useState(false);

  const searchPassword = async () => {
    const userId = document.getElementsByName('search-pw-id')[0].value.trim();
    const emailId = document
      .getElementsByName('search-pw-email')[0]
      .value.trim();
    const emailHost = document
      .getElementsByName('search-pw-write-email')[0]
      .value.trim();
    const userEmail = `${emailId}@${emailHost}`;

    const idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    const emailCheck =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!idCheck.test(userId)) {
      return alert('영문자로 시작하는 6-20자의 아이디를 입력하세요');
    }
    if (emailId === '' || emailHost === '') {
      return alert('이메일을 입력하세요');
    } else if (!userEmail.match(emailCheck)) {
      return alert('이메일을 형식에 맞게입력하세요');
    }

    const obj = { user_id: userId, user_email: userEmail };
    const res = await axios('/search/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });
    if (res.data === false) {
      return alert('일치한 데이터가 없습니다. 형식에 맞게 정확히 입력해주세요');
    }

    document.getElementsByName('search-pw-id')[0].value = '';
    alert(res.data.result[0].email + '에 6자리의 숫자코드가 전송됐습니다');
    setResult(true);
    setSecret(res.data.secret);
    setUserData(res.data.result[0]);
  };
  const checkSecretCode = () => {
    const secretCode = Number(secret);
    const secretInput = Number(
      document.getElementsByName('pw-secret')[0].value.trim()
    );

    if (String(secretInput).length !== 6) {
      return alert('6자리의 숫자코드를 입력하세요');
    } else if (secretCode !== secretInput) {
      return alert('인증코드가 일치하지 않습니다. 다시 입력하세요.');
    }
    return setChange(true);
  };
  const changePassword = async () => {
    const changePw = document.getElementsByName('change-pw')[0].value.trim();
    const changePwCheck = document
      .getElementsByName('change-pw-check')[0]
      .value.trim();

    const pwCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!pwCheck.test(changePw)) {
      return alert(
        '비밀번호는 영문자로 시작하며 영문자와 숫자를 포함해 6-20자입니다 '
      );
    } else if (changePw !== changePwCheck) {
      return alert('비밀번호가 일지하지 않습니다');
    }
    const userId = userData.id;
    const obj = { user_id: userId, change_password: changePw };
    await axios('/update/pw', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });
    alert('비밀번호가 변경되었습니다');
    setResult(false);
    setChange(false);

    return backSearchModal(target);
  };
  const resetPwResult = () => {
    setResult(false);
    setChange(false);
  };
  return (
    <>
      <Modal
        visible={searchPwModal}
        wigth='400'
        height='350'
        effect='fadeInDown'
      >
        <BackAndClose
          closeSearchModal={closeSearchModal}
          backSearchModal={backSearchModal}
          resetPwResult={resetPwResult}
          target={target}
        ></BackAndClose>
        {!result ? (
          <SearchBox>
            <h4>비밀번호 찾기</h4>
            <div className='input-info id'>
              <h5>아이디</h5>
              <input type='text' maxLength='15' name='search-pw-id'></input>
            </div>
            <div className='input-info email'>
              <h5>이메일</h5>
              <input type='text' maxLength='20' name='search-pw-email'></input>@
              <input
                type='text'
                maxLength='15'
                name='search-pw-write-email'
              ></input>
            </div>
            <SearchSubmit>
              <input
                type='button'
                value='SEARCH'
                name='search-pw-submit'
                onClick={() => searchPassword()}
              ></input>
            </SearchSubmit>
          </SearchBox>
        ) : !change ? (
          <ResultBox>
            <h4>비밀번호 찾기</h4>
            <div className='search-pw-result'>
              <p>
                <b>{userData.email}</b>로 전송된 6자리의 숫자코드를 입력하세요
              </p>
              <div className='input-number-div'>
                <input
                  className='input-number'
                  type='text'
                  maxLength='6'
                  name='pw-secret'
                ></input>
                <EnterSubmit>
                  <input
                    type='button'
                    value='ENTER'
                    name='pw-secret-submit'
                    onClick={() => checkSecretCode()}
                  />
                </EnterSubmit>
              </div>
            </div>
          </ResultBox>
        ) : (
          <ChangePwBox>
            <h4>비밀번호 변경</h4>
            <div className='change-pw-result'>
              <span>
                변경할 비밀번호를 입력하세요. 비밀번호는{' '}
                <b>영문자로 시작하며 영문, 숫자를 포함해 6-20자</b> 입니다
              </span>
              <div className='input-pw'>
                <h5>비밀번호</h5>
                <input type='password' name='change-pw' maxLength='20'></input>
              </div>
              <div className='input-pw'>
                <h5>비밀번호 확인</h5>
                <input
                  type='password'
                  name='change-pw-check'
                  maxLength='20'
                ></input>
              </div>
              <SearchSubmit>
                <input
                  type='button'
                  value='CHANGE'
                  name='change-pw-submit'
                  onClick={() => changePassword()}
                ></input>
              </SearchSubmit>
            </div>
          </ChangePwBox>
        )}
      </Modal>
    </>
  );
}
export default SearchPw;
