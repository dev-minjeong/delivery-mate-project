import axios from 'axios';

import '../css/view.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PickupMap, Calculate } from './../inc/index.js';
import _ from 'lodash';

function View({
  login,
  admin,
  data,
  date,
  joinNum,
  getData,
  getJoinExist,
  joinExist,
  preView,
  nextView,
  getPreNextData,
  toggleMapModal,
  mapModal,
  userName,
  getWriterMapData,
  writerLat,
  writerLon,
  writerName,
  getBoardJoinData,
  resizePage,
  writerPay,
  loginCheck,
  getLocation,
}) {
  const params = useParams();
  const [noneJoinImg, setNoneJoinImg] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-10.png'
  );
  const [joinImg, setJoinImg] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-9.png'
  );
  const [preUrl, setPreUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [modifyUrl, setModifyUrl] = useState('');
  const [join, setJoin] = useState(false);
  const [mateData, setMateData] = useState([]);

  useEffect(() => {
    const boardId = params.data;

    addViewCnt(boardId);
    getWriterMapData(boardId);
    getBoardJoinData(boardId);
    resizePage('view-left', 'view-main', 'view-right');
    if (!data) {
      getData(boardId);
    }
    if (joinExist === null) {
      getJoinInfo();
    }
    if (preView === '' || nextView === '') {
      getPreNextData(boardId);
    }
    if (preView.length) {
      setPreUrl(`/view/${preView[0].board_id}`);
    }
    if (nextView.length) {
      setNextUrl(`/view/${nextView[0].board_id}`);
    }
    if (data.data) {
      setModifyUrl(`/write/modify/${data.data[0].board_id}`);
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
        storageJoinList.map((el) => {
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
  }, [data]);
  // 조회수 카운트
  const addViewCnt = async (boardId) => {
    await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardId },
    });
  };

  // 참여하기
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

  // 페이지
  const changeViewPage = (url) => {
    if (url === 'null_pre') {
      return alert('첫 게시물 입니다');
    } else if (url === 'null_next') {
      return alert('마지막 게시물 입니다');
    }
    return (window.location.href = url);
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
  // 지도
  const openMapModal = () => {
    return toggleMapModal(true);
  };
  const gsLocation = async () => {
    const gettingGsLocation = await getLocation();
    toggleJoin(gettingGsLocation.latitude, gettingGsLocation.longitude);
  };

  return (
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
                <div className='user-nickname'>{data.data[0].writer_name}</div>
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
            <div className='join'>
              {userName !== writerName ? (
                <div>
                  <img
                    src={!joinExist ? noneJoinImg : joinImg}
                    alt='nonejoin'
                    onClick={() => gsLocation()}
                  ></img>
                  <h5>참여하기</h5>
                </div>
              ) : null}

              <h5>(참여자: {joinNum}명)</h5>
            </div>
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
          <div className='other-box'>
            <div className='pre-view'>
              <p>이전글</p>
              <div
                className='pre-btn'
                onClick={() =>
                  preUrl ? changeViewPage(preUrl) : changeViewPage('null_pre')
                }
              >
                ◀
              </div>

              <div className='pre-title'>
                {preView.length > 0 ? (
                  preView[0].title.length > 5 ? (
                    `${preView[0].title.slice(0, 5)}..`
                  ) : (
                    preView[0].title
                  )
                ) : (
                  <p>이전글이 없습니다.</p>
                )}
              </div>
            </div>
            <input
              type='button'
              value='목록'
              id='view-list-btn'
              onClick={() => (window.location.href = '/')}
            ></input>
            <div className='next-view'>
              <p>다음글</p>
              <div
                className='next-btn'
                onClick={() =>
                  nextUrl
                    ? changeViewPage(nextUrl)
                    : changeViewPage('null_next')
                }
              >
                ▶
              </div>
              <div className='next-title'>
                {nextView.length > 0 ? (
                  nextView[0].title.length > 5 ? (
                    `${nextView[0].title.slice(0, 5)}..`
                  ) : (
                    nextView[0].title
                  )
                ) : (
                  <p>다음글이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default View;
