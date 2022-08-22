import axios from 'axios';

import './main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function View({ login, admin, toggleModal, userId, data, date, getData }) {
  const board_data = useParams();

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
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default View;
