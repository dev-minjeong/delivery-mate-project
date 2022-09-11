import axios from 'axios';

import '../css/view.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PickupMap, Calculate, Join, PageMove } from './../inc/index.js';
import { Loading } from './index.js';

function View({
  login,
  admin,
  data,
  date,
  joinNum,
  getData,
  getJoinExist,
  toggleMapModal,
  mapModal,
  userName,
  getWriterMapData,
  writerLat,
  writerLon,
  writerName,
  getBoardJoinData,
  writerPay,
  loginCheck,
  getLocation,
  joinExist,
  setPageMain,
}) {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [modifyUrl, setModifyUrl] = useState('');
  const [join, setJoin] = useState(false);
  const [mateData, setMateData] = useState([]);

  useEffect(() => {
    const boardId = params.data;
    setPageMain(false);
    addViewCnt(boardId);
    getWriterMapData(boardId);
    getBoardJoinData(boardId);
    if (!data) {
      getData(boardId);
    }
    if (data.data) {
      setModifyUrl(`/write/modify/${data.data[0].board_id}`);
    }

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
            setJoin(true);
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
    setLoading(false);
  }, [data]);

  // 조회수 카운트
  const addViewCnt = async (boardId) => {
    await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardId },
    });
  };

  // 게시글
  const removeView = async () => {
    if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      const boardId = params.data;

      await axios('/delete/board', {
        method: 'POST',
        headers: new Headers(),
        data: { board_id: boardId },
      });
      alert('게시글이 삭제되었습니다.');
      return (window.location.href = '/');
    }
  };
  // 참여자
  const toggleJoin = async (mate_lat, mate_lon) => {
    if (!loginCheck()) {
      return;
    }
    const boardId = params.data;
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

  // 지도
  const openMapModal = () => {
    return toggleMapModal(true);
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className='view'>
          {data.data ? (
            <div className='view-box'>
              <div className='title-box'>
                {admin === 'Y' || userName === data.data[0].writer_name ? (
                  <div className='write-option-box'>
                    <Link to={modifyUrl}>
                      <input type='button' value='수정'></input>
                    </Link>
                    <input
                      type='button'
                      value='삭제'
                      onClick={() => removeView()}
                    ></input>
                  </div>
                ) : null}
                <input
                  type='text'
                  id='title-txt'
                  name='title'
                  defaultValue={data.data[0].title}
                  readOnly
                ></input>
                <div className='board-info-box'>
                  <div className='user-info'>
                    <img alt='' src='' className='nick-img'></img>
                    <div className='user-nickname'>
                      {data.data[0].writer_name}
                    </div>
                  </div>
                  <div className='board-info'>
                    <div>조회수: {data.data[0].view_cnt}</div>
                    <div>{date}</div>
                  </div>
                </div>
              </div>
              <div className='contents-box'>
                <div
                  id='content-txt'
                  dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
                ></div>
              </div>
              <div className='join-box'>
                <Join
                  userName={userName}
                  writerName={writerName}
                  joinNum={joinNum}
                  joinExist={joinExist}
                  gsLocation={gsLocation}
                ></Join>
                {join || userName === data.data[0].writer_name ? (
                  <div className='setting-box'>
                    <input
                      type='button'
                      value='픽업장소 확인'
                      className='pickup-map'
                      onClick={() => openMapModal()}
                    ></input>
                    {userName === data.data[0].writer_name ? null : (
                      <Calculate
                        writerPay={writerPay}
                        writerName={writerName}
                        userName={userName}
                        joinNum={joinNum}
                      ></Calculate>
                    )}
                  </div>
                ) : null}
              </div>
              <PickupMap
                toggleMapModal={toggleMapModal}
                mapModal={mapModal}
                writerLat={writerLat}
                writerLon={writerLon}
                mateData={mateData}
                writerPay={writerPay}
              ></PickupMap>
              <PageMove></PageMove>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
export default View;
