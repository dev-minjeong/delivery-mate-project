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
  .name {
    input {
      width: 175px;
    }
  }
  .bday {
    input:nth-child(2) {
      width: 100px;
      margin-left: 17px;
    }
    input:nth-child(3) {
      width: 25px;
      margin-right: 3px;
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
`;
const SearchIdResult = styled.div`
  margin: 43px 0;
  div {
    margin-top: 20px;
    display: flex;
    h5 {
      margin: 4px 20px 0 0;
    }
  }
`;
const SearchSubmit = styled.div`
  margin-top: 30px;
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

function SearchId({
  searchIdModal,
  closeSearchModal,
  backSearchModal,
  target,
}) {
  const [result, setResult] = useState(false);

  const searchUserId = async () => {
    const userName = document
      .getElementsByName('search-id-name')[0]
      .value.trim();
    const userBday = Number(
      document.getElementsByName('search-id-bday')[0].value.trim()
    );
    const userSex = Number(
      document.getElementsByName('search-id-sex')[0].value.trim()
    );
    const emailId = document
      .getElementsByName('search-id-email')[0]
      .value.trim();
    const emailHost = document
      .getElementsByName('search-id-write-email')[0]
      .value.trim();

    const userEmail = `${emailId}@${emailHost}`;
    const emailCheck =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (userName === '' || userName.length < 2) {
      return alert('최소 2글자 이상의 이름을 입력하세요');
    }
    if (userBday === 0 || userSex === 0) {
      return alert('생년월일을 모두 입력하세요');
    } else if (isNaN(userBday) || isNaN(userSex)) {
      return alert('생년월일은 숫자만 입력하세요');
    }
    if (emailId === '' || emailHost === '') {
      return alert('이메일을 모두 입력하세요');
    } else if (!userEmail.match(emailCheck)) {
      return alert('이메일의 형식에 맞게 입력하세요');
    }

    const obj = {
      user_name: userName,
      user_birthday: userBday,
      user_sex: userSex,
      user_email: userEmail,
    };
    const res = await axios('/search/id', {
      method: 'POST',
      data: obj,
      headers: new Headers(),
    });
    if (res.data.length === 0) {
      return alert('일치한 데이터가 없습니다. 형식에 맞게 정확히 입력해주세요');
    }
    setResult(res.data);
  };
  const resetIdResult = () => {
    setResult(false);
  };
  const resetBack = () => {
    resetIdResult();
    return backSearchModal(target);
  };
  return (
    <>
      <Modal
        visible={searchIdModal}
        width='400'
        height='350'
        effect='fadeInDown'
      >
        <BackAndClose
          closeSearchModal={closeSearchModal}
          backSearchModal={backSearchModal}
          resetIdResult={resetIdResult}
          target={target}
        ></BackAndClose>
        {!result ? (
          <SearchBox>
            <h4>아이디 찾기</h4>
            <div className='input-info name'>
              <h5>이름 / 닉네임</h5>
              <input type='text' maxLength='15' name='search-id-name'></input>
            </div>
            <div className='input-info bday'>
              <h5>생년월일</h5>
              <input type='text' maxLength='6' name='search-id-bday'></input>-
              <input type='text' maxLength='1' name='search-id-sex'></input>
              ******
            </div>
            <div className='input-info email'>
              <h5>이메일</h5>
              <input type='text' maxLength='20' name='search-id-email'></input>@
              <input
                type='text'
                maxLength='15'
                name='search-id-write-email'
              ></input>
            </div>
            <SearchSubmit>
              <input
                type='button'
                value='SEARCH'
                name='search-id-submit'
                onClick={() => searchUserId()}
              ></input>
            </SearchSubmit>
          </SearchBox>
        ) : (
          <ResultBox>
            <div className='search-id-result'>
              <h4>아이디 조회 결과</h4>
              <SearchIdResult>
                <div>
                  <h5>아이디</h5>
                  {result[0].id}
                </div>
                <div>
                  <h5>가입일</h5>
                  {result[0].signup_date.slice(0, 10)}
                </div>
              </SearchIdResult>
              <SearchSubmit>
                <input
                  type='button'
                  value='
                  GO TO LOGIN'
                  name='search-id-back'
                  onClick={() => resetBack()}
                ></input>
              </SearchSubmit>
            </div>
          </ResultBox>
        )}
      </Modal>
    </>
  );
}
export default SearchId;
