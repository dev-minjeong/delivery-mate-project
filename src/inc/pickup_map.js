import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import '../App.css';

function PickupMap({ toggleMapModal, mapModal, userLocationData }) {
  return (
    <>
      <Modal
        visible={mapModal}
        width='400px'
        height='400px'
        effect='fadeInDown'
        onClickAway={() => toggleMapModal(false)}
      >
        <KakaoMap
          className='pickupMap'
          userLocationData={userLocationData}
        ></KakaoMap>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
}
export default PickupMap;
