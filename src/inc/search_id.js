import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-awesome-modal';
import { BackAndClose } from './index.js';

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
          <div className='search-box'>
            <h4>아이디 찾기</h4>
            <div>
              <h5>이름</h5>
              <input type='text' maxLength='15' name='search-id-name'></input>
            </div>
            <div>
              <h5>생년월일</h5>
              <input type='text' maxLength='6' name='search-id-bday'></input>-
              <input type='text' maxLength='1' name='search-id-sex'></input>
              ******
            </div>
            <div>
              <h5>이메일</h5>
              <input type='text' maxLength='20' name='search-id-email'></input>@
              <input
                type='text'
                maxLength='15'
                name='search-id-write-email'
              ></input>
            </div>
            <div>
              <input
                type='button'
                value='조회하기'
                name='search-id-submit'
                onClick={() => searchUserId()}
              ></input>
            </div>
          </div>
        ) : (
          <div className='result-box'>
            <h4>아이디 찾기</h4>
            <div className='search-id-result'>
              <p>
                {'< '}아이디 조회 결과{' >'}
              </p>
              <div className='search-id-result-div'>
                <div>
                  <h5>아이디</h5>
                  {result[0].id}
                </div>
                <div>
                  <h5>가입일</h5>
                  {result[0].signup_date.slice(0, 10)}
                </div>
              </div>
              <div>
                <input
                  type='button'
                  value='돌아가기'
                  name='search-id-back'
                  onClick={() => resetBack()}
                ></input>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
export default SearchId;
