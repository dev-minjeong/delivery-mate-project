import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Join } from '../inc/index.js';

const Footer = ({
  userName,
  writerName,
  joinExist,
  loginCheck,
  getJoinExist,
  getData,
  writerLat,
  writerLon,
  setJoinExist,
  setWriterMapData,
  setMateMapData,
  data,
  getWriterMapData,
  getBoardJoinData,
  login,
  getLocation,
  onModalOpenBtn,
  mateLat,
  mateLon,
  updateMap,
}) => {
  const [mateData, setMateData] = useState([]);

  const params = useParams();

  useEffect(() => {
    const boardId = params.data;
    getWriterMapData(boardId);
    getBoardJoinData(boardId);
    if (joinExist === null) {
      getJoinInfo();
    }
    if (updateMap === true) {
      toggleJoin();
    }
    if (sessionStorage.join) {
      const storageJoinList = JSON.parse(sessionStorage.join);
      if (storageJoinList.length > 0) {
        mateData.push(
          {
            mate_lat: writerLat,
            mate_lon: writerLon,
            name: writerName,
          },
          ...storageJoinList
        );
        storageJoinList.forEach((el) => {
          if (el.name === userName) {
            setJoinExist(true);
          }
        });
      } else {
        mateData.push({
          mate_lat: writerLat,
          mate_lon: writerLon,
          name: writerName,
        });
      }
    }
  }, [data, updateMap]);

  const getJoinInfo = async () => {
    if (login) {
      const boardId = params.data;
      const obj = {
        board_id: boardId,
        name: userName,
      };
      const getData = await axios(
        'https://delivery-mate.herokuapp.com/check/join',
        {
          method: 'POST',
          headers: new Headers(),
          data: obj,
        }
      );
      if (getData.data[0]) {
        return getJoinExist(true);
      }
      getJoinExist(false);
    }
  };

  const gsLocation = async () => {
    if (joinExist) {
      toggleJoin();
    } else {
      const gettingGsLocation = await getLocation();
      setMateMapData(gettingGsLocation.latitude, gettingGsLocation.longitude);
      onModalOpenBtn('settingMap');
    }
  };
  const toggleJoin = async () => {
    const boardId = params.data;
    if (!loginCheck()) {
      return;
    }
    const obj = {
      type: 'add',
      board_id: boardId,
      name: userName,
      mate_lat: mateLat,
      mate_lon: mateLon,
    };
    const res = await axios('https://delivery-mate.herokuapp.com/update/join', {
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
        await axios('https://delivery-mate.herokuapp.com/update/join', {
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
    return window.location.reload();
  };
  return (
    <FooterBox>
      <Join
        userName={userName}
        writerName={writerName}
        gsLocation={gsLocation}
        joinExist={joinExist}
      ></Join>
      {joinExist || userName === writerName ? (
        <SettingBox>
          <input
            type='button'
            value='픽업장소'
            className='pickup-map'
            onClick={() => {
              setWriterMapData(writerLat, writerLon, mateData);
              onModalOpenBtn('pickupMap');
            }}
          ></input>
          {userName === writerName ? null : (
            <input
              type='button'
              value='금액계산'
              onClick={() => onModalOpenBtn('calculate')}
            ></input>
          )}
        </SettingBox>
      ) : null}
    </FooterBox>
  );
};

const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  padding: 2.5vh 10vw;
  width: 100%;
  height: 14vh;
  background-color: #2b2b2b;
  display: flex;
  justify-content: space-between;
  z-index: 10;
`;
const SettingBox = styled.div`
  display: flex;
  input {
    width: 100px;
    height: 8vh;
    cursor: pointer;
    border: 2px solid #c9f2ac;
    background-color: inherit;
    color: #c9f2ac;
    font-weight: 500;
    font-size: 15px;
    font-weight: bold;
    margin: 5px 0 0 30px;
    box-shadow: 2px 1px 10px 0px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
      background-color: #c9f2ac;
      color: #2b2b2b;
    }
  }
`;

export default Footer;
