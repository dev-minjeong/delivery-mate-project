import { Routes, Route } from 'react-router-dom';
import { Write, List, View, SignUp } from './index.js';
import { RightWrite, Reply } from './right/index.js';
import { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';

const MainBox = styled.div`
  width: 100%;
  flex-basis: 100%;
`;

const Main = ({
  login,
  admin,
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
  userName,
  writerName,
  writerPay,
  loginCheck,
  joinExist,
  getJoinExist,
  getBoardJoinData,
}) => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [viewLeft, setViewLeft] = useState('');
  const [viewMain, setViewMain] = useState('');
  const [viewRight, setViewRight] = useState('');
  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);
  const [mapModal, setMapModal] = useState(false);

  const withProps = (Component, props) => {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
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

  // 지도
  const getLocation = () => {
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (error) {
            console.log(error);
            resolve({
              latitude: 33.450701,
              longitude: 126.570667,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }).then((coords) => {
        return coords;
      });
    }
    alert('GPS를 지원하지 않습니다');
    return {
      latitude: 33.450701,
      longitude: 126.570667,
    };
  };
  const getWriterMapData = async (board_id) => {
    const data = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
    setWriterLat(data.data[0].writer_lat);
    setWriterLon(data.data[0].writer_lon);
  };
  const toggleMapModal = (boolean) => {
    setMapModal(boolean);
  };

  // 구역 비율 재설정
  const resizePage = (main, right) => {
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
    toggleMapModal: toggleMapModal,
    mapModal: mapModal,
    userName: userName,
    getWriterMapData: getWriterMapData,
    writerLat: writerLat,
    writerLon: writerLon,
    writerName: writerName,
    resizePage: resizePage,
    writerPay: writerPay,
    loginCheck: loginCheck,
    getLocation: getLocation,
    joinExist: joinExist,
    getJoinExist: getJoinExist,
    getBoardJoinData: getBoardJoinData,
  });
  const RightWriteWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    selectCategory: selectCategory,
    selectCategoryData: selectCategoryData,
    userName: userName,
    getLocation: getLocation,
  });
  const RightWriteModifyWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    selectCategory: selectCategory,
    selectCategoryData: selectCategoryData,
    userName: userName,
    getLocation: getLocation,
  });
  const RightReplyWithProps = withProps(Reply, {
    data: data,
    login: login,
    admin: admin,
    loginCheck: loginCheck,
    userId: userId,
  });

  return (
    <MainBox>
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
    </MainBox>
  );
};
export default Main;
