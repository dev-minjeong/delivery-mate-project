import styled from 'styled-components';

const KakaoMap = ({ className, addCenterMarker }) => {
  return (
    <MapContainer id='mapContainer'>
      <div id='map' className={className}></div>
      <input
        id='addMarkerBtn'
        className={className}
        type='button'
        value='픽업위치 찾기'
        onClick={() => addCenterMarker()}
      ></input>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  .settingMap {
    width: 30vw;
    max-width: 300px;
    aspect-ratio: 1 / 1;
  }
  .settingMap + #addMarkerBtn,
  .mateSettingMap + #addMarkerBtn {
    visibility: hidden;
    height: 0;
  }
  .pickupMap,
  .mateSettingMap {
    width: 400px;
    height: 400px;
  }
  .pickupMap + #addMarkerBtn {
    width: 117px;
    height: 35px;
    position: absolute;
    top: 410px;
    left: 140px;
    padding: 7px 12px;
    font-size: 14px;
    font-weight: 900;
    /* border: 1px solid #BBF294; */
    background-color: #bbf294;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    z-index: 1;
    cursor: pointer;
  }
`;

export default KakaoMap;
