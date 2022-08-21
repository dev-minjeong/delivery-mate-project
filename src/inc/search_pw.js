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
      </Modal>
    </>
  );
}
export default SearchPw;
