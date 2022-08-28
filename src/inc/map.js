import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import '../App.css';

function Map({ toggleMapModal, mapModal }) {
  return (
    <>
      <Modal
        visible={mapModal}
        width='400px'
        height='400px'
        effect='fadeInDown'
        onClickAway={() => toggleMapModal(false)}
      >
        <KakaoMap></KakaoMap>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
}
export default Map;
