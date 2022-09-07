import { Routes, Route } from 'react-router-dom';
import { Write, List, View, SignUp } from './index.js';
import { RightWrite, Reply } from './right/index.js';
import { Category } from './left/index.js';
import { useState } from 'react';

import '../css/main.css';
import axios from 'axios';

const Main = ({
  login,
  admin,
  userIp,
  loginModal,
  toggleLoginModal,
  listData,
  listAllPage,
  listSearch,
  listPage,
  changePage,
  changeCategory,
  userId,
  data,
  date,
  joinNum,
  getData,
  categoryData,
  selectCategory,
  selectCategoryData,
  getJoinExist,
  joinExist,
  preView,
  nextView,
  getPreNextData,
  replyData,
  replyNum,
  getReplyData,
  toggleMapModal,
  mapModal,
  userName,
  getWriterMapData,
  writerLat,
  writerLon,
  writerName,
  getBoardJoinData,
  writerPay,
  loginCheck,
}) => {
  const [category, setCategory] = useState('');
  const [change_Category, setChange_Category] = useState(false);
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [viewLeft, setViewLeft] = useState('');
  const [viewMain, setViewMain] = useState('');
  const [viewRight, setViewRight] = useState('');

  const withProps = (Component, props) => {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
  };
  const changeState = () => {
    setChange_Category(true);
  };
  const getContents = (val) => {
    const contents = val.trim();
    setContents(contents);
  };
  const getTitles = () => {
    const title = document.getElementsByName('title')[0].value.trim();
    setTitle(title);
  };
  const getModifyData = async (board_id) => {
    const getBoardData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
    setTitle(getBoardData.data[0].title);
    setContents(getBoardData.data[0].contents);
  };

  // 구역 비율 재설정
  const resizePage = (left, main, right) => {
    setViewLeft(left);
    setViewMain(main);
    setViewRight(right);
  };

  const ListWithProps = withProps(List, {
    listData: listData,
    listAllPage: listAllPage,
    listSearch: listSearch,
    listPage: listPage,
    changePage: changePage,
  });
  const WriteWithProps = withProps(Write, {
    getContents: getContents,
    getTitles: getTitles,
    contents: contents,
    title: title,
    resizePage: resizePage,
  });
  const WriteModifyWithProps = withProps(Write, {
    getContents: getContents,
    getTitles: getTitles,
    contents: contents,
    title: title,
    getModifyData: getModifyData,
    resizePage: resizePage,
  });
  const ViewWithProps = withProps(View, {
    login: login,
    admin: admin,
    data: data,
    date: date,
    joinNum: joinNum,
    getData: getData,
    getJoinExist: getJoinExist,
    joinExist: joinExist,
    preView: preView,
    nextView: nextView,
    getPreNextData: getPreNextData,
    toggleMapModal: toggleMapModal,
    mapModal: mapModal,
    userName: userName,
    getWriterMapData: getWriterMapData,
    writerLat: writerLat,
    writerLon: writerLon,
    writerName: writerName,
    getBoardJoinData: getBoardJoinData,
    resizePage: resizePage,
    writerPay: writerPay,
    loginCheck: loginCheck,
  });
  const RightWriteWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    selectCategory: selectCategory,
    selectCategoryData: selectCategoryData,
    userName: userName,
  });
  const RightWriteModifyWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    selectCategory: selectCategory,
    selectCategoryData: selectCategoryData,
    userName: userName,
  });
  const RightReplyWithProps = withProps(Reply, {
    replyData: replyData,
    replyNum: replyNum,
    data: data,
    login: login,
    admin: admin,
    loginCheck: loginCheck,
    userId: userId,
    getReplyData: getReplyData,
  });

  return (
    <div className='main'>
      <div id='main-left' className={viewLeft}>
        <Routes>
          <Route
            path='/'
            element={
              <Category
                changeCategory={changeCategory}
                login={login}
                changeState={changeState}
                admin={admin}
                userIp={userIp}
              />
            }
          ></Route>
        </Routes>
      </div>
      <div id='main-center' className={viewMain}>
        <Routes>
          <Route path='/' element={<ListWithProps />}></Route>
          <Route path='/write' element={<WriteWithProps />}></Route>
          <Route
            path='/write/modify/:data'
            element={<WriteModifyWithProps />}
          ></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/view/:data' element={<ViewWithProps />}></Route>
        </Routes>
      </div>
      <div id='main-right' className={viewRight}>
        <Routes>
          <Route path='/write' element={<RightWriteWithProps />}></Route>
          <Route
            path='/write/modify/:data'
            element={<RightWriteModifyWithProps />}
          ></Route>
          <Route
            path='/view/:data'
            element={<RightReplyWithProps></RightReplyWithProps>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};
export default Main;
