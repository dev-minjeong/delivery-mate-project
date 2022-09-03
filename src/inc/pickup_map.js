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
  const [centerLat, setCenterLat] = useState(0);
  const [centerLon, setCenterLon] = useState(0);
  const [map, setMap] = useState('');
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(writerLat, writerLon),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    const imgSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

    const setMapData = mateData?.map((data) => {
      return {
        name: data.name,
        latlon: new kakao.maps.LatLng(data.mate_lat, data.mate_lon),
      };
    });
    const bounds = new kakao.maps.LatLngBounds();

    setMapData.forEach((el) => {
      console.log(el.latlon);

      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imageSize);

      let marker = new kakao.maps.Marker({
        map: map,
        position: el.latlon,
        name: el.name,
        image: markerImage,
      });
      markers.push(marker);
      marker.setMap(map);
      bounds.extend(el.latlon);
    });
    console.log(setMapData);
    map.setBounds(bounds);

    const centerLatLng = map.getCenter();
    setCenterLat(centerLatLng.getLat());
    setCenterLon(centerLatLng.getLng());
  }, [centerLat, centerLon, mateData, writerLat, writerLon, markers]);

  const addCenterMarker = () => {
    const centerImgSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(centerImgSrc, imageSize);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(centerLat, centerLon),
      image: markerImage,
      name: '픽업장소',
    });
    marker.setMap(map);
    markers.push(marker);
    console.log(markers);
  };

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
        <input
          type='button'
          value='중간위치 찾기'
          onClick={() => addCenterMarker()}
        ></input>
        <div className='map-close-btn' onClick={() => toggleMapModal(false)}>
          ✖
        </div>
      </Modal>
    </>
  );
};
export default PickupMap;
