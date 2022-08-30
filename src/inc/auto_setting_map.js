import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import '../App.css';

function AutoSettingMap({ toggleMapModal, mapModal, userLocationData }) {
  return (
    <>
      <Modal
        visible={mapModal}
        width='400px'
        height='400px'
        effect='fadeInDown'
        onClickAway={() => toggleMapModal(false)}
      >
        <KakaoMap userLocationData={userLocationData}></KakaoMap>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
}
export default AutoSettingMap;
