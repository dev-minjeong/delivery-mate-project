import { Routes, Route } from 'react-router-dom';
import { Write, List, View, SignUp } from './index.js';
import { RightWrite } from './right/index.js';
import { Category } from './left/index.js';
import { useState, Component } from 'react';

import './main.css';
import axios from 'axios';

const Main = ({
  login,
  admin,
  userIp,
  loginModal,
  toggleModal,
  listData,
  listAllPage,
  listSearch,
  listPage,
  changePage,
  changeCategory,
  userId,
  data,
  date,
  likeNum,
  getData,
  getAllLike,
  categoryData,
  selectCategory,
  selectCategoryData,
  getLikeExist,
  likeExist,
}) => {
  const [category, setCategory] = useState('');
  const [change_Category, setChange_Category] = useState(false);
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');

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
    console.log(getBoardData);
  };

  const ListWithProps = withProps(List, {
    category: category,
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
  });
  const ViewWithProps = withProps(View, {
    login: login,
    admin: admin,
    toggleModal: toggleModal,
    userId: userId,
    data: data,
    date: date,
    likeNum: likeNum,
    getData: getData,
    getAllLike: getAllLike,

    getLikeExist: getLikeExist,
    likeExist: likeExist,
  });
  const RightWriteWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    selectCategory: selectCategory,
    selectCategoryData: selectCategoryData,
  });

  return (
    <div className='main'>
      <div id='main-left'>
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
      <div id='main-center'>
        <Routes>
          <Route path='/' element={<ListWithProps />}></Route>
          <Route path='/write' element={<WriteWithProps />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/view/:data' element={<ViewWithProps />}></Route>
        </Routes>
      </div>
      <div id='main-right'>
        <Routes>
          <Route path='/write' element={<RightWriteWithProps />}></Route>
        </Routes>
      </div>
    </div>
  );
};
export default Main;
