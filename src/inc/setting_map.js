import { KakaoMap } from './index.js';
import { useEffect, useState } from 'react';
import '../App.css';
import styled from 'styled-components';
/* global kakao */

const MapUpdateBtn = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    border: 2px solid #f27289;
    border-radius: 30px;
    padding: 8px 15px;
    background-color: inherit;
    cursor: pointer;
    color: #f27289;
    font-weight: 900;
    :hover {
      color: white;
      background-color: #f27289;
    }
  }
`;

function SettingMap({ lattitude, longitude, UpdateMapMarker, finalSubmit }) {
  const [updateLat, setUpdateLat] = useState('');
  const [updateLon, setUpdateLon] = useState('');

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lattitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      let latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      console.log(`위도: ${latlng.getLat()} 경도:${latlng.getLng()}`);
      setUpdateLat(latlng.getLat());
      setUpdateLon(latlng.getLng());
    });
  }, [lattitude, longitude]);
  const submitMap = () => {
    UpdateMapMarker(updateLat, updateLon);
    finalSubmit(true);
    alert('위치가 저장되었습니다');
  };

  return (
    <>
      <KakaoMap className='settingMap'></KakaoMap>
      <MapUpdateBtn>
        <button onClick={submitMap}>위치저장</button>
      </MapUpdateBtn>
    </>
  );
}
export default SettingMap;
