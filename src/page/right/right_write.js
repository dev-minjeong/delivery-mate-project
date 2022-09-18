import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { SettingMap } from './../../inc/index.js';
import { LogoImg } from './../../img/index';
import { BiChevronsDown } from 'react-icons/bi';

const RightWriteBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6vh 7vw 0 0;
  .select-option {
    display: flex;
    margin: 0 3px 5px 3px;

    img {
      width: 30px;
      height: 30px;
      margin: 4px 10px;
    }
  }
  .select-category {
    padding: 4px;
    margin-top: 5px;
  }

  #post-submit {
    text-align: center;
    margin-top: 20px;
  }
  #post-submit button {
    width: 120px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ababab;
    cursor: pointer;
    background-color: white;
  }
`;
const DetailOptions = styled.details`
  border-radius: 4px;
  summary {
    margin-top: 20px;
    display: flex;
    background-color: #c9f2ac;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0.3px 2px 10px 0px rgba(0, 0, 0, 0.2);
    svg {
      font-size: 20px;
      margin: 0 10px;
    }
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
  }
`;
const RadioCategory = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .radio-category-option {
    input[type='radio'] {
      display: none;
    }
    input[type='radio'] + label {
      display: inline-block;
      width: 65px;
      border: 1px solid #f27289;
      border-radius: 1px;
      margin: 13px 4px 0;
      padding: 5px;
      cursor: pointer;
      text-align: center;
      font-weight: 900;
      font-size: 13px;
    }
    input[type='radio']:checked + label {
      background-color: #f27289;
      color: white;
    }
  }
`;
const RadioPay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 17px;
  .radio-pay-option {
    input[type='radio'] {
      display: none;
    }
    input[type='radio'] + label {
      display: inline-block;
      width: 80px;
      border: 1px solid #f27289;
      border-radius: 1px;
      padding: 5px;
      cursor: pointer;
      text-align: center;
      font-weight: 900;
      font-size: 13px;
    }
    input[type='radio']:checked + label {
      background-color: #f27289;
      color: white;
    }
  }
`;
const PaySetting = styled.div`
  h5 {
    margin-top: 10px;
    font-weight: 100;
  }
  .delivery-cost-box {
    margin-top: 10px;
    display: flex;
    font-size: 15px;
    font-weight: bold;
    input {
      width: 90px;
      margin: 0 9px;
    }
  }
`;
const MapSetting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    margin: 10px;
  }
`;
const PostSubmitBtn = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    label {
      visibility: ${(props) => !props.handle && 'visible'};
    }
  }
  button {
    cursor: pointer;
    font-size: 14px;
    font-weight: bolder;
    height: 50px;
    width: 150px;
    border: 2px solid #bbf294;
    box-shadow: 0.3px 2px 10px 0px rgba(0, 0, 0, 0.2);
    :disabled {
      cursor: default;
      color: white;
      box-shadow: none;
      background-color: lightgray;
      border: none;
    }
  }
  label {
    visibility: hidden;
    margin: 7px;
    font-size: 11px;
    font-weight: bold;
  }
`;

function RightWrite({
  contents,
  categoryData,
  userName,
  userNum,
  getLocation,
}) {
  const params = useParams();
  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);
  const [paySelect, setPaySelect] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [selectCategory, setSelectCategory] = useState('');

  useEffect(() => {
    gsLocation();
    if (params.data && !selectCategory) {
      selectCategoryData(params.data);
    }
  }, []);

  const inputCost = () => {
    if (paySelect === 'pay') {
      setDeliveryCost(0);
    } else if (paySelect === 'share') {
      const cost = document.getElementsByName('delivery-cost')[0].value.trim();
      setDeliveryCost(cost);
    }
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
        writer_id: userNum,
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
        writer_id: userNum,
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
    // console.info(`gsLocation: ${JSON.stringify(gettingGsLocation)}`);
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
  const radioPay = (result) => {
    setPaySelect(result);
  };
  const finalSubmit = (result) => {
    setSubmitBtn(result);
  };
  const radioCategory = (result) => {
    console.log(result);
    setSelectCategory(result);
    selectCategoryData();
  };
  const selectCategoryData = async (board_id) => {
    if (board_id) {
      const getBoardData = await axios('/get/board_data', {
        method: 'POST',
        headers: new Headers(),
        data: { id: board_id },
      });
      return setSelectCategory(getBoardData.data[0].food_id);
    }
  };

  return (
    <RightWriteBox>
      <div className='select-option'>
        <img src={LogoImg} alt='logo-img' className='logo-img'></img>
        <h2>Options</h2>
      </div>
      <DetailOptions>
        <summary>
          <BiChevronsDown></BiChevronsDown>
          음식 카테고리 선택
        </summary>
        <RadioCategory>
          {categoryData
            ? categoryData.map((el, key) => {
                return (
                  <div className='radio-category-option' key={key}>
                    <input
                      type='radio'
                      id={el.id}
                      name='select-category'
                      value={el.id}
                      checked={el.id === selectCategory}
                      onChange={() => radioCategory(el.id)}
                    ></input>
                    <label htmlFor={el.id}>{el.name}</label>
                  </div>
                );
              })
            : null}
        </RadioCategory>
      </DetailOptions>
      <DetailOptions>
        <summary>
          <BiChevronsDown></BiChevronsDown>
          배달비 선택
        </summary>
        <RadioPay>
          <div className='radio-pay-option'>
            <input
              type='radio'
              id='pay'
              value='본인 부담'
              name='select-pay'
              checked={paySelect === 'pay'}
              onChange={() => radioPay('pay')}
            ></input>
            <label htmlFor='pay'>본인 부담</label>
            <input
              type='radio'
              id='share'
              value='나눠 내기'
              name='select-pay'
              checked={paySelect === 'share'}
              onChange={() => radioPay('share')}
            ></input>
            <label htmlFor='share'>나눠 내기</label>
          </div>
          {paySelect ? (
            <PaySetting>
              <h5>
                {paySelect === 'pay'
                  ? `배달비 본인 부담 시 본인이 지정한 위치에서 픽업이 가능합니다.`
                  : `배달비 나눠 낼 경우 참여 메이트들의 중간 위치에서 픽업 가능합니다.`}
              </h5>
              {paySelect === 'share' ? (
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
            </PaySetting>
          ) : null}
        </RadioPay>
      </DetailOptions>
      <DetailOptions>
        <summary>
          <BiChevronsDown></BiChevronsDown>
          위치 지정
        </summary>
        <MapSetting>
          <h4>
            {paySelect === 'pay'
              ? `픽업하실 위치를 설정하세요`
              : `본인의 위치를 설정하세요`}
          </h4>
          <SettingMap
            lattitude={writerLat}
            longitude={writerLon}
            UpdateMapMarker={UpdateMapMarker}
            finalSubmit={finalSubmit}
          ></SettingMap>
        </MapSetting>
      </DetailOptions>
      <PostSubmitBtn handle={submitBtn}>
        <label>모든 옵션 설정 시 포스팅이 가능합니다.</label>
        <button onClick={() => submitBoard()} disabled={!submitBtn}>
          {!params.data ? '게시글 올리기' : '게시글 수정'}
        </button>
      </PostSubmitBtn>
    </RightWriteBox>
  );
}
export default RightWrite;
