import Modal from 'react-awesome-modal';
import { KakaoMap } from './index.js';
import { useEffect, useRef, useState } from 'react';

import '../css/map.css';
/* global kakao */

const PickupMap = ({
  toggleMapModal,
  mapModal,
  writerLat,
  writerLon,
  mateData,
  writerPay,
}) => {
  const [centerLat, setCenterLat] = useState(0);
  const [centerLon, setCenterLon] = useState(0);
  const [map, setMap] = useState('');
  const [markers, setMarkers] = useState([]);
  const [pickupLat, setPickupLat] = useState(0);
  const [pickupLon, setPickupLon] = useState(0);

  useEffect(() => {
    const mapContainer = document.getElementById('mapContainer');
    const centerMarkerOpen = document.getElementById('addMarkerBtn');
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(writerLat, writerLon),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);

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

      let content = `
        <div class="custom-overlay">
        <span class="marker-name" style="position: relative;
        bottom: 65px; left: 20px; text-align: center; color: #00a0e9;
          border-radius:6px; border: 1px; font-size: 14px;
          box-shadow: 0px 1px 2px #888; font-weight: bold;
          background: #fff; margin-right: 35px; padding: 10px 10px;
          ">
        ${el.name}</span>
        </div>`;
      let customOverlay = new kakao.maps.CustomOverlay({
        position: el.latlon,
        content: content,
      });
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        customOverlay.setMap(map, marker);
      });
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
      });
      markers.push(marker);
      marker.setMap(map);
      bounds.extend(el.latlon);
    });
    map.setBounds(bounds);

    const centerLatLng = map.getCenter();
    setCenterLat(centerLatLng.getLat());
    setCenterLon(centerLatLng.getLng());

    if (writerPay) {
      setPickupLat(centerLat);
      setPickupLon(centerLon);
    } else {
      setPickupLat(writerLat);
      setPickupLon(writerLon);
    }
  }, [
    centerLat,
    centerLon,
    mateData,
    writerLat,
    writerLon,
    markers,
    writerPay,
  ]);
  const addCenterMarker = () => {
    const centerImgSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 35);
    const imageOption = new kakao.maps.Point(20, 60);
    const markerImage = new kakao.maps.MarkerImage(
      centerImgSrc,
      imageSize,
      imageOption
    );
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(pickupLat, pickupLon),
      image: markerImage,
      name: '픽업장소',
    });
    const content = `
    <div class-"center-custom-overlay" style="position: relative; bottom: 70px;
      border-radius: 6px; border: 1px solid #ccc;border-bottom: 2px solid #ddd;
      float: left; border: 0;box-shadow: 0px 1px 2px #888;">
      <a href="https://map.kakao.com/link/to/픽업장소
      ,${centerLat} ,${centerLon}" target="_blank" style="display: block;
        text-decoration: none;color: #000; text-align: center; border-radius: 6px;
        font-size: 14px; font-weight: bold; overflow: hidden; background: #fbc02d;
        background: #fbc02d
          url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
          no-repeat right 14px center;">
        <span class="title" style="display: block; text-align: center;
          background: #fff; margin-right: 35px; padding: 10px 10px;
          font-size: 14px; font-weight: bold;">
        픽업장소</span>
      </a>
    </div>
  `;
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: new kakao.maps.LatLng(centerLat, centerLon),
      content: content,
      yAnchor: 1,
    });
    marker.setMap(map);
    customOverlay.setMap(map);
    markers.push(marker);
  };

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
          addCenterMarker={addCenterMarker}
        ></KakaoMap>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
};
export default PickupMap;
