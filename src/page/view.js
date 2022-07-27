import axios from 'axios';

import './main.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const board_data = useParams();
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const board_id = board_data.data;
    gettingData(board_id);
    addViewCnt(board_id);
  }, []);

  // 리스트 데이터 조회
  const gettingData = async (board_id) => {
    const getData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });

    // 날짜 구하기
    const date =
      getData.data.data[0].date.slice(0, 10) +
      ' ' +
      getData.data.data[0].date.slice(11, 16);
    setData(getData.data);
    setDate(date);
    // return { data: setData(getData), date: setDate(date) };
  };

  // 조회수 카운트
  const addViewCnt = async (board_id) => {
    const addView = await axios('/update/view_cnt', {
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
            <textarea
              id='content-txt'
              name='contents'
              defaultValue={data.data[0].contents}
              readOnly
            ></textarea>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default View;
