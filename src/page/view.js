import axios from 'axios';

import './main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function View({ login, admin, toggleModal, userId, data, date, getData }) {
  const params = useParams();
  // const [data, setData] = useState([]);
  // const [date, setDate] = useState('');
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
    if (!login) {
      alert('로그인 후 이용가능합니다');
      return toggleModal(true);
    }
    const boardId = params.data;
    const obj = { type: 'add', user_id: userId, board_id: boardId };
    const res = await axios('/update/like', {
      method: 'POST',
      headers: new Headers(),
      data: obj,
    });

    if (!res.data) {
      return alert('이미 좋아요가 반영되었습니다');
    } else {
      return alert('해당 게시물에 좋아요가 반영되었습니다');
    }
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
              <div></div>
              <div className='like'>
                <img
                  src={noneLike}
                  alt='nonelike'
                  onClick={() => toggleLike()}
                ></img>
                <h5>좋아요</h5>
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
