import { useRef } from 'react';
import styled from 'styled-components';
import {
  OnClickAway,
  Login,
  SettingMap,
  PickupMap,
  Calculate,
} from '../../index';

function Modal({
  isOpen,
  onClose,
  handleLogin,
  writerLat,
  writerLon,
  mateData,
  writerPay,
  writerName,
  userName,
  joinNum,
  mateLat,
  mateLon,
  UpdateMapMarker,
}) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };
  OnClickAway(modalRef, handleClose);
  return (
    <div id='modal'>
      <Overlay>
        <ModalWrap ref={modalRef}>
          {isOpen === 'login' ? (
            <Login handleLogin={handleLogin} handleClose={handleClose}></Login>
          ) : null}
          {isOpen === 'settingMap' ? (
            <SettingMap
              lattitude={mateLat}
              longitude={mateLon}
              UpdateMapMarker={UpdateMapMarker}
              mateClassName='mateSettingMap'
            ></SettingMap>
          ) : null}

          {isOpen === 'pickupMap' ? (
            <PickupMap
              writerPay={writerPay}
              writerLat={writerLat}
              writerLon={writerLon}
              mateData={mateData}
              handleClose={handleClose}
            ></PickupMap>
          ) : null}
          {isOpen === 'calculate' ? (
            <Calculate
              writerPay={writerPay}
              writerName={writerName}
              userName={userName}
              joinNum={joinNum}
              handleClose={handleClose}
            ></Calculate>
          ) : null}
        </ModalWrap>
      </Overlay>
    </div>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
`;
const ModalWrap = styled.div`
  width: 400px;
  height: 380px;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: fadeInDown 0.5s;
  transform: translate(-50%, -50%);
  @keyframes fadeInDown {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export default Modal;
