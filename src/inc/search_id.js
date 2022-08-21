import Modal from 'react-awesome-modal';

function SearchId(props) {
  return (
    <>
      <Modal
        visible={props.searchIdModal}
        width='400'
        height='350'
        effect='fadeInDown'
      >
        Search ID Page
      </Modal>
    </>
  );
}
export default SearchId;
