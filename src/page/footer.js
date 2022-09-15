import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Calculate, Join } from '../inc/index.js';

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

const Footer = ({
  userName,
  writerName,
  joinNum,
  writerPay,
  joinExist,
  loginCheck,
  getJoinExist,
  getData,
  writerLat,
  writerLon,
  setJoinExist,
  setWriterMapData,
  toggleMapModal,
  toggleCalcModal,
  data,
  getWriterMapData,
  getBoardJoinData,
  login,
  getLocation,
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
  }, [data]);

  const getJoinInfo = async () => {
    if (login) {
      const boardId = params.data;
      const obj = {
        board_id: boardId,
        name: userName,
      };
      const getData = await axios('/check/join', {
        method: 'POST',
        headers: new Headers(),
        data: obj,
      });
      if (getData.data[0]) {
        return getJoinExist(true);
      }
      getJoinExist(false);
    }
  };

  const gsLocation = async () => {
    const gettingGsLocation = await getLocation();
    toggleJoin(gettingGsLocation.latitude, gettingGsLocation.longitude);
  };
  const toggleJoin = async (mate_lat, mate_lon) => {
    const boardId = params.data;
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
    return window.location.reload();
  };
  const openMapModal = () => {
    setWriterMapData(writerLat, writerLon, mateData);
    return toggleMapModal(true);
  };
  const openCalcMaodal = () => {
    return toggleCalcModal(true);
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
            onClick={() => openMapModal()}
          ></input>
          {userName === writerName ? null : (
            <input
              type='button'
              value='금액계산'
              onClick={() => openCalcMaodal()}
            ></input>
          )}
        </SettingBox>
      ) : null}
    </FooterBox>
  );
};
export default Footer;
