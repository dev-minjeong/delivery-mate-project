/* global kakao */
import { useEffect } from 'react';

function KakaoMap() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  // useEffect(() => {
  //   new kakao.maps.Map(container.current, options);
  //   return () => {};
  // }, []);

  return <div id='map' style={{ width: '400px', height: '400px' }}></div>;
}
export default KakaoMap;
