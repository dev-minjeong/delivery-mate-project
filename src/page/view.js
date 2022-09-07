import axios from 'axios';

import '../css/view.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PickupMap } from './../inc/index.js';
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

  /**
   * 1. 메인리스트에 조회수 대신 닉네임 표시 ⭕
   * 2. 상세페이지에 조회수 표시 ⭕
   * 3. 글쓴이만 글쓴 페이지에 송금 링크 댓글 달 수 있음
   * 4. 코드정리 및 컴포넌트 분할
   * 5. 디자인 있어보이게
   * 6. 지도 픽업마커 옮길 수 있게 ❌ -> 마커 커스텀도 같이 이동 안됨
   * 7. 지도 커스텀, 마커 길찾기 링크추가 ⭕
   * 8. 유저 이미지 디자인(4-5개) 및 랜덤 배치
   * 9. 포스팅 시 픽업장소 ⭕
   *      1) 글쓴이 지정 -> 배달비 본인 부담
   *      2) 중간 지점 -> 글쓴이 본인부담 또는 1/n중 택1
   * 10. 배달비 1/n 기능 구현
   * 11. 메이트들 각자 시킨 음식과 가격 적어놓는 컴포넌트 구현
   * 12. 스타일 컴포넌트 사용해 코드 정리
   * 13. recoile, react-query 적용하여 상태관리
   * 14. 다크모드 적용
   */

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
      // return window.location.reload();
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
            <input type='button' value='배달비 나누기'></input>
            {join || userName === data.data[0].writer_name ? (
              <input
                type='button'
                value='픽업장소 확인'
                className='pickup-map'
                onClick={() => openMapModal()}
              ></input>
            ) : null}
          </div>
          <PickupMap
            toggleMapModal={toggleMapModal}
            mapModal={mapModal}
            writerLat={writerLat}
            writerLon={writerLon}
            mateData={mateData}
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
            <div className='join'>
              {userName !== writerName ? (
                <img
                  src={!joinExist ? noneJoinImg : joinImg}
                  alt='nonejoin'
                  onClick={() => gsLocation()}
                ></img>
              ) : null}

              <h5>
                참여하기<br></br>(참여자: {joinNum}명)
              </h5>
            </div>
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

          <input
            type='button'
            value='목록'
            id='view-list-btn'
            onClick={() => (window.location.href = '/')}
          ></input>
        </div>
      ) : null}
    </div>
  );
}
export default View;
