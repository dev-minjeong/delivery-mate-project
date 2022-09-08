import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './inc/index.js';
import { Main } from './page/index.js';
import queryString from 'query-string';
import axios from 'axios';

function App() {
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [listData, setListData] = useState([]);
  const [listPage, setListPage] = useState(1);
  const [listLimit, setListLimit] = useState(10);
  const [listAllPage, setListAllPage] = useState([]);
  const [listSearch, setListSearch] = useState('');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [joinNum, setJoinNum] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [writerName, setWriterName] = useState('');
  const [writerPay, setWriterPay] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [joinExist, setJoinExist] = useState(null);

  const locationSearch = useLocation().search;

  useEffect(() => {
    getListData();
    getAllCategoryData();
    if (sessionStorage.login && sessionStorage.IP) {
      setLogin(JSON.parse(sessionStorage.login).id);
      setAdmin(JSON.parse(sessionStorage.login).admin);
      setUserIp(JSON.parse(sessionStorage.IP));
      setUserId(JSON.parse(sessionStorage.login).user_id);
      setUserName(JSON.parse(sessionStorage.login).name);
    }
  }, []);

  // 보드
  const getData = async (board_id) => {
    const getBoardData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
    const date =
      getBoardData.data[0].date.slice(5, 10) +
      ' ' +
      getBoardData.data[0].date.slice(11, 16);
    setData(getBoardData);
    setDate(date);
    setJoinNum(getBoardData.data[0].join_cnt);
    setWriterName(getBoardData.data[0].writer_name);
    setWriterPay(getBoardData.data[0].pay);
  };

  // 페이지
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

  // 리스트
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
    const totalCnt = await axios('/get/board_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { search: search, category: categorys },
    });
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
    let pageArr = [];
    for (let i = 1; i <= Math.ceil(totalCnt.data.cnt / listLimit); i++) {
      pageArr.push(i);
    }
    setListData(JSON.stringify(totalList.data));
    setListAllPage(pageArr);
    setListSearch(search);
  };

  // 로그인
  const handleLogin = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc));
    sessionStorage.setItem('IP', JSON.stringify(data.ip));

    setLogin(JSON.parse(sessionStorage.login).id);
    setAdmin(JSON.stringify(data.suc).admin);
    setUserIp(JSON.parse(sessionStorage.IP));
    setUserId(JSON.parse(sessionStorage.login).user_id);

    return window.location.reload();
  };
  const handleLogout = () => {
    setLogin(false);
    setAdmin(false);
    setUserIp('');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('IP');
  };
  const loginCheck = () => {
    if (!login) {
      alert('로그인후 이용 가능합니다');
      toggleLoginModal(true);
      return false;
    }
    return true;
  };
  const toggleLoginModal = (boolean) => {
    setLoginModal(boolean);
  };

  // 카테고리
  const changeCategory = (target) => {
    sessionStorage.setItem('category', target);
    return (window.location.href = '/');
  };
  const getAllCategoryData = async () => {
    const getCategoryData = await axios('/get/category');
    setCategoryData(getCategoryData.data);
  };
  const selectCategoryData = async (board_id) => {
    let category = document.getElementsByName('select-category')[0].value;
    if (board_id) {
      const getBoardData = await axios('/get/board_data', {
        method: 'POST',
        headers: new Headers(),
        data: { id: board_id },
      });
      return setSelectCategory(getBoardData.data[0].food_id);
    }
    setSelectCategory(category);
  };

  //Join
  const getJoinExist = (result) => {
    setJoinExist(result);
  };
  const getBoardJoinData = async (board_id) => {
    const data = { board_id: board_id };

    const getData = await axios('/get/join_data', {
      method: 'POST',
      headers: new Headers(),
      data: data,
    });
    sessionStorage.setItem('join', JSON.stringify(getData.data));
  };

  return (
    <div className='App'>
      <Header
        login={login}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loginModal={loginModal}
        toggleLoginModal={toggleLoginModal}
      ></Header>
      <Main
        login={login}
        admin={admin}
        listData={listData}
        listAllPage={listAllPage}
        listSearch={listSearch}
        listPage={listPage}
        changePage={changePage}
        changeCategory={changeCategory}
        userId={userId}
        data={data}
        date={date}
        joinNum={joinNum}
        getData={getData}
        categoryData={categoryData}
        selectCategory={selectCategory}
        selectCategoryData={selectCategoryData}
        userName={userName}
        writerName={writerName}
        writerPay={writerPay}
        loginCheck={loginCheck}
        joinExist={joinExist}
        getJoinExist={getJoinExist}
        getBoardJoinData={getBoardJoinData}
      ></Main>
    </div>
  );
}

export default App;
