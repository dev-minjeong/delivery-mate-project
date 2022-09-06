import './map.css';

const KakaoMap = ({ className, addCenterMarker }) => {
  return (
    <div id='mapContainer'>
      <div id='map' className={className}></div>
      <input
        id='addMarkerBtn'
        className={className}
        type='button'
        value='중간위치 찾기'
        onClick={() => addCenterMarker()}
      ></input>
    </div>
  );
};
export default KakaoMap;
