import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-awesome-modal';
import { BackAndClose } from './index.js';

function SearchPw({
  searchPwModal,
  closeSearchModal,
  backSearchModal,
  target,
}) {
  const [result, setResult] = useState(false);

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
    if (res.data.length === 0) {
      return alert('일치한 데이터가 없습니다. 형식에 맞게 정확히 입력해주세요');
    }
    setResult(true);
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
          target={target}
        ></BackAndClose>
        {!result ? (
          <div className='search-box'>
            <h4>비밀번호 찾기</h4>
            <div>
              <h5>아이디</h5>
              <input type='text' maxLength='15' name='search-pw-id'></input>
            </div>
            <div>
              <h5>이메일</h5>
              <input type='text' maxLength='20' name='search-pw-email'></input>@
              <input
                type='text'
                maxLength='15'
                name='search-pw-write-email'
              ></input>
            </div>
            <div>
              <input
                type='button'
                value='조회하기'
                name='search-pw-submit'
                onClick={() => searchPassword()}
              ></input>
            </div>
          </div>
        ) : (
          <div className='result-box'>
            <h4>비밀번호 찾기</h4>
            <div className='search-pw-result'>
              <p>
                {'< '}비밀번호 조회 결과{' >'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
export default SearchPw;
