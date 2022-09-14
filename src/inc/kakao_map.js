import styled from 'styled-components';

const MapContainer = styled.div`
  .settingMap {
    min-width: 200px;
    min-height: 200px;
  }
  .settingMap + #addMarkerBtn {
    /* width: 10px;
    height: 10px;
    position: absolute;
    top: 8px;
    left: 8px; */
    visibility: hidden;
  }
  .pickupMap {
    width: 400px;
    height: 400px;
  }
  .pickupMap + #addMarkerBtn {
    width: 110px;
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
export default KakaoMap;
