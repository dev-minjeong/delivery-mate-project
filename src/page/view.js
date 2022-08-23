import axios from 'axios';

import './main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function View({ login, admin, toggleModal, userId, data, date, getData }) {
  const board_data = useParams();
  // const [data, setData] = useState([]);
  // const [date, setDate] = useState('');
  const [noneLike, setNoneLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-10.png'
  );
  const [like, setLike] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-9.png'
  );

  useEffect(() => {
    const board_id = board_data.data;
    addViewCnt(board_id);
    if (!data) {
      getData(board_id);
    }
  }, []);

  // 조회수 카운트
  const addViewCnt = async (board_id) => {
    await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
  };
  const toggleLike = async () => {
    if (!login) {
      alert('로그인 후 이용가능합니다');
      return toggleModal(true);
    } else {
      alert('좋아요 버튼을 클릭합니다');
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
