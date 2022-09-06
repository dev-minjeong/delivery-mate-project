import { KakaoMap } from './index.js';
import { useEffect, useState } from 'react';
import '../App.css';
/* global kakao */

function SettingMap({ lattitude, longitude, UpdateMapMarker }) {
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
  }, []);
  const submitMap = () => {
    UpdateMapMarker(updateLat, updateLon);
  };

  return (
    <>
      <KakaoMap className='settingMap'></KakaoMap>
      <button onClick={submitMap}>위치확인</button>
    </>
  );
}
export default SettingMap;
