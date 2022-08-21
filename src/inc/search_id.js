import Modal from 'react-awesome-modal';
import { BackAndClose } from './index.js';

function SearchId({
  searchIdModal,
  closeSearchModal,
  backSearchModal,
  target,
}) {
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
          target={target}
        ></BackAndClose>
      </Modal>
    </>
  );
}
export default SearchId;
