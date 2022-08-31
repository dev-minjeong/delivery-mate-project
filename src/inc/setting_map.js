import { KakaoMap } from './index.js';
import '../App.css';

function SettingMap({ lattitude, longitude }) {
  return (
    <KakaoMap
      className='settingMap'
      lattitude={lattitude}
      longitude={longitude}
    ></KakaoMap>
  );
}
export default SettingMap;
