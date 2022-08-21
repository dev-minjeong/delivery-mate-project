import Modal from 'react-awesome-modal';
import { BackAndClose } from './index.js';

function SearchPw({
  searchPwModal,
  closeSearchModal,
  backSearchModal,
  target,
}) {
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
            ></input>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default SearchPw;
