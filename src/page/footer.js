import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Calculate, Join } from '../inc/index.js';

const FooterBox = styled.div`
  background-color: whitesmoke;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: ${(props) => (props.bottom ? '100px' : '0')};
  visibility: ${(props) => (props.bottom ? 'visible' : 'hidden')};
  z-index: 10;
`;

const Footer = ({
  pageFooter,
  userName,
  writerName,
  joinNum,
  writerPay,
  setWriterMapData,
  loginCheck,
  writerLat,
  writerLon,
  getJoinExist,
  getData,
  login,
  toggleMapModal,
  mateData,
  joinExist,
  boardId,
}) => {
  // 참여자
  const toggleJoin = async (mate_lat, mate_lon) => {
    if (!loginCheck()) {
      return;
    }
    const obj = {
      type: 'add',
      board_id: boardId,
      name: userName,
      mate_lat: mate_lat,
      mate_lon: mate_lon,
    };
    const res = await axios('/update/join', {
      method: 'POST',
      headers: new Headers(),
      data: obj,
    });

    if (!res.data) {
      if (window.confirm('참여를 취소하시겠습니까?')) {
        const cancel = {
          type: 'remove',
          board_id: boardId,
          name: userName,
        };
        await axios('/update/join', {
          method: 'POST',
          headers: new Headers(),
          data: cancel,
        });
        getJoinExist(false);
        getData(boardId);

        alert('취소되었습니다');
      }
    } else {
      getJoinExist(true);
      getData(boardId);

      alert('해당 게시물에 참여하실 수 있습니다');
    }
  };

  // 지도
  const getLocation = () => {
    if (navigator.geolocation) {
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
    alert('GPS를 지원하지 않습니다');
    return {
      latitude: 33.450701,
      longitude: 126.570667,
    };
  };
  const gsLocation = async () => {
    const gettingGsLocation = await getLocation();
    toggleJoin(gettingGsLocation.latitude, gettingGsLocation.longitude);
  };
  const openMapModal = () => {
    setWriterMapData(writerLat, writerLon, mateData);
    return toggleMapModal(true);
  };

  return (
    <FooterBox bottom={pageFooter}>
      <Join
        userName={userName}
        writerName={writerName}
        joinNum={joinNum}
        gsLocation={gsLocation}
        joinExist={joinExist}
      ></Join>
      {joinExist || userName === writerName ? (
        <div className='setting-box'>
          <input
            type='button'
            value='픽업장소 확인'
            className='pickup-map'
            onClick={() => openMapModal()}
          ></input>
          {userName === writerName ? null : (
            <Calculate
              writerPay={writerPay}
              writerName={writerName}
              userName={userName}
              joinNum={joinNum}
            ></Calculate>
          )}
        </div>
      ) : null}
    </FooterBox>
  );
};
export default Footer;
