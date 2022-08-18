import './App.css';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Header } from './inc/index.js';
import { Main } from './page/index.js';
import queryString from 'query-string';
import axios from 'axios';

const App = (props) => {
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [signup, setSignup] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [listData, setListData] = useState([]);
  const [listPage, setListPage] = useState(1);
  const [listLimit, setListLimit] = useState(10);
  const [listAllPage, setListAllPage] = useState([]);
  const [listSearch, setListSearch] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [likeNum, setLikeNum] = useState('');
  const locationSearch = useLocation().search;
  // const location = useLocation();

  useEffect(() => {
    getListData();
    if (sessionStorage.login && sessionStorage.IP) {
      setLogin(JSON.parse(sessionStorage.login).id);
      setAdmin(JSON.parse(sessionStorage.login).admin);
      setUserIp(JSON.parse(sessionStorage.IP));
    }
  }, []);

  // const getData = async (board_id) => {
  //   const getBoardData = await axios('/get/board_data', {
  //     method: 'POST',
  //     headers: new Header(),
  //     data: { id: board_id },
  //   });
  //   const date =
  //     getBoardData.data[0].date.slice(0, 10) +
  //     ' ' +
  //     getBoardData.data[0].date.slice(11, 16);
  //     setData(getBoardData);
  //     setDate(date);
  //     setLikeNum(getBoardData.data[0].likes)
  // };
  const setPage = () => {
    if (sessionStorage.page) {
      setListPage(Number(sessionStorage.page));
      return Number(sessionStorage.page);
    }
    setListPage(1);
    return 1;
  };
  const changePage = (el) => {
    setListPage(el);
    sessionStorage.setItem('page', el);
    return getListData();
  };
  const getListData = async () => {
    const listPages = setPage();

    let categorys = '';
    if (sessionStorage.getItem('category')) {
      categorys = sessionStorage.getItem('category');
    }
    let search = '';
    if (queryString.parse(locationSearch)) {
      search = queryString.parse(locationSearch).search;
    }
    // 전체 Board 테이블 수
    const totalCnt = await axios('/get/board_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { search: search, category: categorys },
    });
    // 리스트 데이터 불러오기
    const totalList = await axios('/get/board', {
      method: 'POST',
      headers: new Headers(),
      data: {
        limit: listLimit,
        page: listPages,
        search: search,
        category: categorys,
      },
    });
    // 전체 페이지 수
    let pageArr = [];
    for (let i = 1; i <= Math.ceil(totalCnt.data.cnt / listLimit); i++) {
      pageArr.push(i);
    }
    setListData(JSON.stringify(totalList.data));
    setListAllPage(pageArr);
    setListSearch(search);
  };
  const handleLogin = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc));
    sessionStorage.setItem('IP', JSON.stringify(data.ip));
    setLogin(JSON.parse(sessionStorage.login).id);
    setAdmin(JSON.stringify(data.suc).admin);
    setUserIp(JSON.parse(sessionStorage.IP));
    return window.location.reload();
  };
  const handleLogout = () => {
    setLogin(false);
    setAdmin(false);
    setUserIp('');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('IP');
  };
  const toggleModal = (boolean) => {
    setLoginModal(boolean);
  };
  const changeCategory = (target) => {
    sessionStorage.setItem('category', target);
    return (window.location.href = '/');
  };
  return (
    <div className='App'>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Header
        login={login}
        admin={admin}
        userIp={userIp}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loginModal={loginModal}
        toggleModal={toggleModal}
      ></Header>
      <Main
        login={login}
        admin={admin}
        userIp={userIp}
        loginModal={loginModal}
        toggleModal={toggleModal}
        listData={listData}
        listAllPage={listAllPage}
        listSearch={listSearch}
        listPage={listPage}
        changePage={changePage}
        changeCategory={changeCategory}
        userId={userId}
        data={data}
        date={date}
      ></Main>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
