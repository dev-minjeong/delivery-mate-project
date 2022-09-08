import axios from 'axios';

import '../../css/main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SettingMap } from './../../inc/index.js';

function RightWrite({
  contents,
  categoryData,
  selectCategory,
  selectCategoryData,
  userName,
  getLocation,
}) {
  const params = useParams();
  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);
  const [toggleBtnClick, setToggleBtnClick] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);

  useEffect(() => {
    gsLocation();
    if (params.data && !selectCategory) {
      selectCategoryData(params.data);
    }
  }, []);
  const inputCost = () => {
    if (toggleBtnClick === 'pay') {
      setDeliveryCost(0);
    } else if (toggleBtnClick === 'share') {
      const cost = document.getElementsByName('delivery-cost')[0].value.trim();
      setDeliveryCost(cost);
    }
    console.log(deliveryCost);
  };

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
        pay: deliveryCost,
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
        pay: deliveryCost,
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
  const gsLocation = async () => {
    const gettingGsLocation = await getLocation();
    console.info(`gsLocation: ${JSON.stringify(gettingGsLocation)}`);
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
  const togglePayBtn = (result) => {
    setToggleBtnClick(result);
  };
  const finalSubmit = (result) => {
    setSubmitBtn(result);
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
          type='radio'
          id='pay-for-delivery'
          value='배달비 본인 부담'
          checked={toggleBtnClick === 'pay'}
          onChange={() => togglePayBtn('pay')}
        ></input>
        <label htmlFor='pay-for-delivery'>배달비 본인 부담</label>
        <input
          type='radio'
          id='share-delivery-cost'
          checked={toggleBtnClick === 'share'}
          onChange={() => togglePayBtn('share')}
        ></input>
        <label htmlFor='share-delivery-cost'>배달비 나눠 내기</label>
        {toggleBtnClick ? (
          <div>
            <h5>
              {toggleBtnClick === 'pay'
                ? `배달비 본인 지불 시 본인이 지정하신 위치에서 픽업이 가능합니다.`
                : `배달비 나눠 지불 시 참여하는 메이트들의 중간위치에서 픽업 가능합니다.`}
            </h5>
            {toggleBtnClick === 'share' ? (
              <div className='delivery-cost-box'>
                <p>총 배달비 : </p>
                <input
                  type='number'
                  name='delivery-cost'
                  onChange={() => inputCost()}
                />
                원
              </div>
            ) : null}
            <h3>
              {toggleBtnClick === 'pay'
                ? `픽업하실 위치를 설정하세요`
                : `본인의 위치를 설정하세요`}
            </h3>
            <SettingMap
              lattitude={writerLat}
              longitude={writerLon}
              UpdateMapMarker={UpdateMapMarker}
              finalSubmit={finalSubmit}
            ></SettingMap>
          </div>
        ) : null}
      </div>
      {submitBtn ? (
        <div id='post-submit'>
          <button onClick={() => submitBoard()}>
            {!params.data ? '게시글 올리기' : '게시글 수정'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default RightWrite;
