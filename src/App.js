import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

import { Side } from './page/left/index.js';
import { Calculate, Header, Login, PickupMap } from './inc/index.js';
import { Main } from './page/index.js';

import './App.css';
import { history } from './history.js';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  list-style: none;
  border: none;
  font-family: 'nanum';
}
svg, path {
  color: inherit;
}
svg{
  cursor: pointer;
}
input {
    border: none;
  
  :focus {
      outline: none;
    }
}
`;
const AppBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.left ? '80vw' : '100vw')};
  background-color: whitesmoke;
`;

function App() {
  // login
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNum, setUserNum] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  // list
  const [listData, setListData] = useState([]);
  const [listPage, setListPage] = useState(1);
  const [listLimit, setListLimit] = useState(10);
  const [listAllPage, setListAllPage] = useState([]);
  const [listSearch, setListSearch] = useState('');
  // category
  const [categoryData, setCategoryData] = useState([]);
  // board
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [writerName, setWriterName] = useState('');
  const [writerPay, setWriterPay] = useState(false);
  // join
  const [joinExist, setJoinExist] = useState(null);
  const [joinNum, setJoinNum] = useState('');
  // map
  const [mateData, setMateData] = useState([]);
  const [mapModal, setMapModal] = useState(false);
  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);
  // calculate
  const [calcModal, setCalcModal] = useState(false);
  // css
  const [pageLeft, setPageLeft] = useState(true);
  const [pageMain, setPageMain] = useState(true);
  const [pageRight, setPageRight] = useState(false);
  const [pageFooter, setPageFooter] = useState(false);

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
      setUserEmail(JSON.parse(sessionStorage.login).email);
      setUserNum(JSON.parse(sessionStorage.login).user_id);
    }
    let unlisten = history.listen((location) => {
      if (history.action === 'POP') {
        return window.location.reload();
      }
      return () => {
        unlisten();
      };
    });
  }, [history]);

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
    console.log(totalCnt.data);
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

  // Join
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

  // map
  const toggleMapModal = (boolean) => {
    setMapModal(boolean);
  };
  const setWriterMapData = (writer_lat, writer_lon, mate_data) => {
    setWriterLat(writer_lat);
    setWriterLon(writer_lon);
    setMateData(mate_data);
  };

  // calc
  const toggleCalcModal = (boolean) => {
    setCalcModal(boolean);
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AppBox>
        <Side
          login={login}
          handleLogout={handleLogout}
          toggleLoginModal={toggleLoginModal}
          changeCategory={changeCategory}
          admin={admin}
          userName={userName}
          userEmail={userEmail}
          userNum={userNum}
          pageLeft={pageLeft}
        ></Side>
        <RightBox left={pageLeft} main={pageMain}>
          <Header
            login={login}
            listSearch={listSearch}
            pageMain={pageMain}
            pageFooter={pageFooter}
          ></Header>
          <Main
            login={login}
            admin={admin}
            listData={listData}
            listAllPage={listAllPage}
            listSearch={listSearch}
            listPage={listPage}
            changePage={changePage}
            userId={userId}
            data={data}
            date={date}
            joinNum={joinNum}
            getData={getData}
            categoryData={categoryData}
            userName={userName}
            loginCheck={loginCheck}
            setPageMain={setPageMain}
            pageMain={pageMain}
            pageRight={pageRight}
            setPageLeft={setPageLeft}
            getBoardJoinData={getBoardJoinData}
            writerName={writerName}
            joinExist={joinExist}
            getJoinExist={getJoinExist}
            setJoinExist={setJoinExist}
            toggleMapModal={toggleMapModal}
            toggleCalcModal={toggleCalcModal}
            setWriterMapData={setWriterMapData}
            userNum={userNum}
            setPageRight={setPageRight}
            setPageFooter={setPageFooter}
          ></Main>
        </RightBox>
      </AppBox>
      <Login
        handleLogin={handleLogin}
        loginModal={loginModal}
        toggleLoginModal={toggleLoginModal}
      ></Login>
      <PickupMap
        toggleMapModal={toggleMapModal}
        mapModal={mapModal}
        writerLat={writerLat}
        writerLon={writerLon}
        mateData={mateData}
        writerPay={writerPay}
      ></PickupMap>
      <Calculate
        writerPay={writerPay}
        writerName={writerName}
        userName={userName}
        joinNum={joinNum}
        calcModal={calcModal}
        toggleCalcModal={toggleCalcModal}
      ></Calculate>
    </>
  );
}

export default App;
