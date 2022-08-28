import axios from 'axios';

import './main.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function View({
  login,
  admin,
  toggleModal,
  userId,
  data,
  date,
  likeNum,
  getData,
  getAllLike,
  getLikeExist,
  likeExist,
  preView,
  nextView,
  getPreNextData,
}) {
  const params = useParams();
  const [noneLike, setNoneLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-10.png'
  );
  const [like, setLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-9.png'
  );
  const [preUrl, setPreUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [modifyUrl, setModifyUrl] = useState('');

  useEffect(() => {
    const boardId = params.data;

    addViewCnt(boardId);
    if (!data) {
      getData(boardId);
    }
    if (likeExist === null) {
      getLikeInfo();
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
  }, []);

  // 조회수 카운트
  const addViewCnt = async (boardId) => {
    await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardId },
    });
  };

  // 좋아요
  const toggleLike = async () => {
    if (!loginCheck()) {
      return;
    }
    const boardId = params.data;
    const obj = { type: 'add', user_id: userId, board_id: boardId };
    const res = await axios('/update/like', {
      method: 'POST',
      headers: new Headers(),
      data: obj,
    });

    if (!res.data) {
      if (window.confirm('좋아요를 취소하시겠습니까?')) {
        const cancel = { type: 'remove', user_id: userId, board_id: boardId };

        await axios('/update/like', {
          method: 'POST',
          headers: new Headers(),
          data: cancel,
        });
        getLikeExist(false);
        getAllLike(boardId);

        alert('좋아요가 취소되었습니다');
      }
    } else {
      getLikeExist(true);
      getAllLike(boardId);

      alert('해당 게시물에 좋아요가 반영되었습니다');
    }
  };
  const getLikeInfo = async () => {
    if (login) {
      const boardId = params.data;
      const obj = { user_id: userId, board_id: boardId };

      const getData = await axios('/check/like', {
        method: 'POST',
        headers: new Headers(),
        data: obj,
      });

      if (getData.data[0]) {
        return getLikeExist(true);
      }
      getLikeExist(false);
    }
  };

  // 로그인
  const loginCheck = () => {
    if (!login) {
      alert('로그인후 이용 가능합니다');
      toggleModal(true);

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
  return (
    <div className='write'>
      {data.data ? (
        <div className='view'>
          <div className='title-box'>
            {admin === 'Y' ? (
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
            <div className='date-box'>{date}</div>
          </div>
          <div className='contents-box'>
            <div
              id='content-txt'
              dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
            ></div>
            <input
              type='button'
              value='목록'
              id='view-list-btn'
              onClick={() => (window.location.href = '/')}
            ></input>
          </div>
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
                  preView[0].title
                ) : (
                  <p>첫 게시물 입니다</p>
                )}
              </div>
            </div>
            <div className='like'>
              <img
                src={!likeExist ? noneLike : like}
                alt='nonelike'
                onClick={() => toggleLike()}
              ></img>
              <h5>좋아요({likeNum})</h5>
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
                  nextView[0].title
                ) : (
                  <p>마지막 게시물 입니다</p>
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
