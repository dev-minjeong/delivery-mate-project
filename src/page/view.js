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
}) {
  const params = useParams();
  const [noneLike, setNoneLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-10.png'
  );
  const [like, setLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-9.png'
  );

  useEffect(() => {
    const boardId = params.data;

    addViewCnt(boardId);
    if (!data) {
      getData(boardId);
    }
    if (likeExist === null) {
      getLikeInfo();
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
  const loginCheck = () => {
    if (!login) {
      alert('로그인후 이용 가능합니다');
      toggleModal(true);

      return false;
    }
    return true;
  };

  return (
    <div className='write'>
      {data.data ? (
        <div>
          <div className='top-title'>
            <input
              type='text'
              id='title-txt'
              name='title'
              defaultValue={data.data[0].title}
              readOnly
            ></input>
            <div className='date-box'>{date}</div>
          </div>
          <div>
            <div
              id='content-txt'
              dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
            ></div>
            <div className='other-div'>
              <input
                type='button'
                value='목록'
                id='view-list-btn'
                onClick={() => (window.location.href = '/')}
              ></input>
              <div></div>
              <div className='like'>
                <img
                  src={!likeExist ? noneLike : like}
                  alt='nonelike'
                  onClick={() => toggleLike()}
                ></img>
                <h5>좋아요({likeNum})</h5>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default View;
