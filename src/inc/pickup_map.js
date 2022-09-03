import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import { useEffect, useRef, useState } from 'react';
import '../App.css';
/* global kakao */

const PickupMap = ({
  toggleMapModal,
  mapModal,
  writerLat,
  writerLon,
  mateData,
}) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(writerLat, writerLon),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    const setMapData = mateData?.map((data) => {
      return {
        name: data.name,
        latlon: new kakao.maps.LatLng(data.mate_lat, data.mate_lon),
      };
    });
    const bounds = new kakao.maps.LatLngBounds();

    setMapData.forEach((el) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: el.latlon,
        name: el.name,
      });
      marker.setMap(map);
      bounds.extend(el.latlon);
    });
    map.setBounds(bounds);
  });

  // useEffect(() => {
  // let writerContent = `
  //   <div>${el.name}<br>
  //     <a href="https://map.kakao.com/link/map/Hello World!
  //     ,${el.lat},${el.lon}" target="_blank">큰지도보기</a>
  //     <a href="https://map.kakao.com/link/to/Hello World!
  //     ,${el.lat} ,${el.lon}" target="_blank">길찾기</a>
  //   </div>`;
  // let position = new kakao.maps.LatLng(el.lat, el.lon);
  // let markerOverlay = new kakao.maps.CustomOverlay({
  //   position: position,
  //   content: writerContent,
  // });
  // kakao.maps.event.addListener(marker, 'mouseover', function () {
  //   markerOverlay.setMap(mapRef.current);
  // });
  // kakao.maps.event.addListener(marker, 'mouseout', function () {
  //   setTimeout(function () {
  //     markerOverlay.setMap();
  //   });
  // });
  //   });
  // }, [mateData]);
  return (
    <>
      <Modal
        visible={mapModal}
        width='400px'
        height='400px'
        effect='fadeInDown'
        onClickAway={() => toggleMapModal(false)}
      >
        <KakaoMap className='pickupMap'></KakaoMap>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
};
export default PickupMap;
