import React from 'react';
import axios from 'axios';

import './main.css';
import { useState, useEffect } from 'react';

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const data_list = await axios('/get/board', {
      method: 'GET',
      headers: new Headers(),
    });
    setData(data_list);
  };
  const list = data.data;
  return (
    <div className='list'>
      <div className='list-title list-box'>
        <div>제목</div>
        <div>조회수</div>
        <div className='acenter'>날짜</div>
      </div>
      {list
        ? list.map((el, key) => {
            return (
              <div className='list-data list-box' key={key}>
                <div>{el.title}</div>
                <div></div>
                <div className='acenter'>{el.date.slice(0, 10)}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default List;
