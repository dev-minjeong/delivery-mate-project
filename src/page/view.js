import axios from 'axios';

import './main.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PickupMap } from './../inc/index.js';
import _ from 'lodash';

function View({
  login,
  admin,
  toggleLoginModal,
  userId,
  data,
  date,
  joinNum,
  getData,
  getJoinExist,
  joinExist,
  preView,
  nextView,
  getPreNextData,
  replyData,
  replyNum,
  getReplyData,
  toggleMapModal,
  mapModal,
  userName,
  getWriterMapData,
  writerLat,
  writerLon,
  writerName,
  getBoardJoinData,
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
  const [mateName, setMateName] = useState('');
  const [mateData, setMateData] = useState([]);

  useEffect(() => {
    const boardId = params.data;

    addViewCnt(boardId);
    getWriterMapData(boardId);
    getBoardJoinData(boardId);
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

    if (replyNum === null) {
      getReplyData(boardId);
    }

    const storageJoinList = JSON.parse(sessionStorage.join);
    if (storageJoinList.length > 0) {
      mateData.push(...storageJoinList, {
        board_id: boardId * 1,
        join_id: 0,
        mate_lat: writerLat,
        mate_lon: writerLon,
        name: writerName,
      });
      setMateName(
        storageJoinList.map((el) => {
          if (el.name === userName) {
            setJoin(true);
          }
          return el.name;
        })
      );
    } else {
      mateData.push({
        board_id: boardId * 1,
        join_id: 0,
        mate_lat: writerLat,
        mate_lon: writerLon,
        name: writerName,
      });
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

  // 로그인
  const loginCheck = () => {
    if (!login) {
      alert('로그인후 이용 가능합니다');
      toggleLoginModal(true);

      return false;
    }
    return true;
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
  // 댓글
  const addReply = async () => {
    const boardId = params.data;
    let reply = document.getElementsByName('reply-write')[0].value.trim();
    // 줄바꿈 처리
    reply = reply.replace(/(\n\\r\n)/g, '<br>');

    if (!loginCheck()) {
      return;
    }
    if (reply === '' || reply.length === 0) {
      document.getElementsByName('reply-write')[0].focus();
      document.getElementsByName('reply-write')[0].value = reply;

      return alert('댓글을 입력하세요');
    } else if (reply.split('<br>').length > 5) {
      return alert('5줄 이내의 댓글을 작성하세요.');
    }
    const data = {
      board_id: boardId,
      contents: reply,
      user_id: userId,
    };
    await axios('/add/reply', {
      method: 'POST',
      headers: new Headers(),
      data: data,
    });
    alert('댓글이 등록되었습니다');

    return window.location.reload();
  };
  const removeReply = async (reply_id) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      await axios('/delete/reply', {
        method: 'POST',
        headers: new Headers(),
        data: { reply_id: reply_id },
      });
    }
    alert('댓글이 삭제되었습니다.');
    return window.location.reload();
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
              <div className='date-box'>{date}</div>
            </div>
          </div>
          <div className='contents-box'>
            <div
              id='content-txt'
              dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
            ></div>
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
              <img
                src={!joinExist ? noneJoinImg : joinImg}
                alt='nonejoin'
                onClick={() => gsLocation()}
              ></img>
              <h5>
                참여하기<br></br>(총 인원: {joinNum})
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
          <div className='reply-box'>
            <h5>댓글</h5>
            <div className='reply-write'>
              <textarea
                rows='3'
                placeholder='댓글 작성 시 참여 가능합니다'
                maxLength='100'
                name='reply-write'
                onClick={() => loginCheck()}
              ></textarea>
              <input
                type='button'
                value='등록'
                id='reply-submit-btn'
                onClick={() => addReply()}
              ></input>
            </div>
            <div className='reply-list-box'>
              {replyData.length > 0 && replyNum > 0 ? (
                <div>
                  <h5>{replyNum}개의 댓글이 있습니다.</h5>
                  {replyData.map((el, key) => {
                    let nickname = el.user.name;
                    if (el.user.admin === 'Y') {
                      nickname = '관리자';
                    }
                    let date =
                      el.date.slice(5, 10) + ' ' + el.date.slice(11, 16);
                    return (
                      <div className='reply-list' key={key}>
                        <div className='reply-contents'>
                          <div
                            style={
                              el.user.admin === 'Y' ||
                              el.user.name === data.data[0].writer_name
                                ? { fontWeight: 'bold', color: 'blue' }
                                : null
                            }
                            className='reply-list-id'
                          >
                            {nickname}
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: el.contents }}
                            className='reply-list-contents'
                          ></div>
                        </div>
                        <div className='reply-delete-date'>
                          {(login && login === el.user.id) || admin === 'Y' ? (
                            <input
                              type='button'
                              value='❌'
                              className='reply-delete-btn'
                              onClick={() => removeReply(el.reply_id)}
                            ></input>
                          ) : (
                            <div></div>
                          )}
                          <div className='reply-list-date'>{date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h5>작성된 댓글이 없습니다.</h5>
              )}
            </div>
            <input
              type='button'
              value='목록'
              id='view-list-btn'
              onClick={() => (window.location.href = '/')}
            ></input>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default View;
