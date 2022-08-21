import Modal from 'react-awesome-modal';

function SearchPw(props) {
  return (
    <>
      <Modal
        visible={props.searchPwModal}
        wigth='400'
        height='350'
        effect='fadeInDown'
      >
        Search PW Page
      </Modal>
    </>
  );
}
export default SearchPw;
