import React from 'react';
import axios from 'axios';

import './main.css';
import { Search } from './index.js';

import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const List = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allPage, setAllPage] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getListData();
    settingPage();
  }, []);

  const getListData = async () => {
    let { category } = props;
    if (sessionStorage.getItem('category')) {
      category = sessionStorage.getItem('category');
    }
    let search = queryString.parse(window.location.search);
    if (search) {
      search = search.search;
      console.log(search);
    }

    // Board 테이블 데이터 전체 수
    const total_cnt = await axios('/get/board_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { search: search, category: category },
    });
    // console.log(total_cnt.data.cnt);

    // 데이터 불러오기
    const total_list = await axios('/get/board', {
      method: 'POST',
      headers: new Headers(),
      data: {
        limit: limit,
        page: settingPage(),
        search: search,
        category: category,
      },
    });

    // 전체 페이지 수 구하기
    let page_arr = [];

    for (let i = 1; i <= Math.ceil(total_cnt.data.cnt / limit); i++) {
      page_arr.push(i);
    }
    setData(total_list);
    setAllPage(page_arr);
    setSearch(search);
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
  // console.log(data);
  const list = data.data;
  return (
    <div className='list'>
      <div className='list-title list-box'>
        <div>제목</div>
        <div>조회수</div>
        <div className='acenter'>날짜</div>
      </div>
      {list && list.length > 0 ? (
        list.map((el, key) => {
          const view_url = '/view/' + el.board_id;
          return (
            <div className='list-data list-box' key={key}>
              <div>
                <Link to={view_url}>{el.title}</Link>
              </div>
              <div className='views'>{el.view_cnt}</div>
              <div className='acenter'>{el.date?.slice(0, 10)}</div>
            </div>
          );
        })
      ) : (
        <div className='not-data acenter'>
          {search !== '' ? (
            <div>{`'${search}'에 대한 `}검색 결과가 없습니다</div>
          ) : (
            <div>게시글이 없습니다</div>
          )}
        </div>
      )}
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
          <Search search={search}></Search>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default List;
