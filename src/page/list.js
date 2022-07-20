import React from 'react';
import axios from 'axios';

import './main.css';
import { useState, useEffect } from 'react';

function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allPage, setAllPage] = useState([]);

  useEffect(() => {
    getListData();
    settingPage();
  }, []);

  const getListData = async () => {
    // Board 테이블 데이터 전체 수
    const total_cnt = await axios('/get/board_cnt');
    console.log(total_cnt.data.cnt);

    // 데이터 불러오기
    const total_list = await axios('/get/board', {
      method: 'POST',
      headers: new Headers(),
      data: { limit: limit, page: settingPage() },
    });

    // 전체 페이지 수 구하기
    let page_arr = [];

    for (let i = 1; i <= Math.ceil(total_cnt.data.cnt / limit); i++) {
      page_arr.push(i);
    }
    console.log(page_arr);

    setData(total_list);
    setAllPage(page_arr);
  };

  const changePage = (el) => {
    setPage(el);
    sessionStorage.setItem('page', el);

    return getListData();
  };

  const settingPage = () => {
    if (sessionStorage.page) {
      setPage(Number(sessionStorage.page));
      return Number(sessionStorage.page);
    }
    setPage(1);
    return 1;
  };
  console.log(data);
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
      <div className='paging-div'>
        <div></div>
        <div>
          <ul>
            {allPage
              ? allPage.map((el, key) => {
                  return el === page ? (
                    <li key={key} className='page-num'>
                      <b>{el}</b>
                    </li>
                  ) : (
                    <li
                      key={key}
                      className='page-num'
                      onClick={() => changePage(el)}
                    >
                      {el}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default List;
