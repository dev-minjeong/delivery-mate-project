import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import { useEffect, useState } from 'react';
import '../App.css';
/* global kakao */

function PickupMap({
  toggleMapModal,
  mapModal,
  writerLat,
  writerLon,
  writerName,
}) {
  console.log(writerLat);
  console.log(writerLon);
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(writerLat, writerLon),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(writerLat, writerLon);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    const writerContent = `<div style="padding:5px; font-size: 15px; font-weight: bold; text-align:center;">${writerName}<br><a href="https://map.kakao.com/link/map/Hello World!,${writerLat},${writerLon}" style="color:blue; font-size: 13px; font-weight: middle;" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,${writerLat},${writerLon}" style="color:blue; font-size: 13px; font-weight: middle;" target="_blank">길찾기</a></div>`;
    const writerWindow = new kakao.maps.InfoWindow({
      position: markerPosition,
      content: writerContent,
    });
    writerWindow.open(map, marker);
  }, []);

  // userLocationData = [
  //   {
  //     name: '떡볶이는못참지',
  //     latitude: 37.6540774,
  //     longitude: 126.6849253,
  //   },
  //   {
  //     name: '버거러버',
  //     latitude: 37.6540775,
  //     longitude: 126.6849253,
  //   },
  //   {
  //     name: '김민정',
  //     latitude: 37.6540776,
  //     longitude: 126.6849253,
  //   },
  // ];

  // useEffect(() => {
  //   const markerData = userLocationData?.map((data) => {
  //     return {
  //       name: data.name,
  //       latitude: data.latitude,
  //       longitude: data.longitude,
  //     };
  //   });
  //   markerData.forEach((element) => {
  //     let marker = new kakao.maps.Maker({
  //       map: mapRef.current,
  //       position: new kakao.maps.LatLng(element.latitude, element.longitude),
  //       title: element.title,
  //     });
  //     let content = `
  //     <div class='map-user-info'>
  //       <h1>${element.title}</h1>
  //     </div>`;
  //     let position = new kakao.maps.LatLng(element.latitude, element.longitude);
  //     let customOverlay = new kakao.maps.CustomOverlay({
  //       position: position,
  //       content: content,
  //     });
  //     kakao.maps.event.addListener(marker, 'mouseover', function () {
  //       customOverlay.setMap(mapRef.current);
  //     });
  //     kakao.maps.event.addListener(marker, 'mouseout', function () {
  //       setTimeout(function () {
  //         customOverlay.setMap();
  //       });
  //     });
  //   });
  // }, [userLocationData]);
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
}
export default PickupMap;
