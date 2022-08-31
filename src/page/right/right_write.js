import axios from 'axios';

import '../main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SettingMap } from './../../inc/index.js';

function RightWrite({
  contents,
  categoryData,
  selectCategory,
  selectCategoryData,
  userName,
}) {
  const params = useParams();
  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);
  const [gpsClick, setGpsClick] = useState(false);

  useEffect(() => {
    if (params.data && !selectCategory) {
      selectCategoryData(params.data);
    }
  }, []);

  const submitBoard = async () => {
    const title = document.getElementsByName('title')[0].value.trim();
    const category = selectCategory;

    if (title === '') {
      return alert('제목을 입력하세요');
    } else if (contents === '') {
      return alert('내용을 입력하세요');
    } else if (category === '') {
      return alert('카테고리를 선택하세요');
    } else if (writerLat === 0 || writerLon === 0) {
      return alert('본인 위치를 지정하세요');
    }
    if (!params.data) {
      const data = {
        title: title,
        contents: contents,
        category: category,
        writer_name: userName,
        writer_lat: writerLat,
        writer_lon: writerLon,
      };
      const res = await axios('/add/board', {
        method: 'POST',
        data: data,
        headers: new Headers(),
      });
      if (res.data) {
        alert('글이 게시되었습니다');
        return window.location.replace('/');
      }
    } else {
      const data = {
        title: title,
        contents: contents,
        category: category,
        board_id: params.data,
        writer_name: userName,
        writer_lat: writerLat,
        writer_lon: writerLon,
      };
      const res = await axios('/update/board', {
        method: 'POST',
        data: data,
        headers: new Headers(),
      });
      if (res.data) {
        alert('글이 수정되었습니다');
        const url = '/view/' + params.data;

        sessionStorage.setItem('category', category);
        return (window.location.href = url);
      }
    }
  };
  // gps
  const getLocation = () => {
    if (navigator.geolocation) {
      // gps 지원 시
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (error) {
            console.log(error);
            resolve({
              latitude: 33.450701,
              longitude: 126.570667,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }).then((coords) => {
        return coords;
      });
    }
    console.log('GPS를 지원하지 않습니다');
    return {
      latitude: 33.450701,
      longitude: 126.570667,
    };
  };
  const gsLocation = async () => {
    const gettingGsLocation = await getLocation();
    console.info(`gsLocation: ${JSON.stringify(gettingGsLocation)}`);
    setGpsClick(true);
    setWriterLat(gettingGsLocation.latitude);
    setWriterLon(gettingGsLocation.longitude);
  };
  const UpdateMapMarker = (updateLat, updateLon) => {
    if (updateLat) {
      setWriterLat(updateLat);
    }
    if (updateLon) {
      setWriterLon(updateLon);
    }
  };

  return (
    <div className='write-submit-box'>
      <div className='select-category-box'>
        <h4>카테고리 선택</h4>
        <select
          name='select-category'
          onChange={() => selectCategoryData()}
          value={selectCategory}
        >
          <option value=''>- 카테고리 선택 -</option>
          {categoryData
            ? categoryData.map((el, key) => {
                return (
                  <option value={el.id} key={key}>
                    {el.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      <div>
        <input
          type='button'
          value={!params.data ? '내 위치 지정하기' : '내 위치 업데이트하기'}
          onClick={() => gsLocation()}
        ></input>
        {gpsClick ? (
          <SettingMap
            lattitude={writerLat}
            longitude={writerLon}
            UpdateMapMarker={UpdateMapMarker}
          ></SettingMap>
        ) : null}
      </div>
      <div id='post-submit'>
        <button onClick={() => submitBoard()}>
          {!params.data ? '게시글 올리기' : '게시글 수정'}
        </button>
      </div>
    </div>
  );
}
export default RightWrite;
