import { Routes, Route, useParams } from 'react-router-dom';
import { Write, List, View, SignUp, Footer } from './index.js';
import { RightWrite, Reply } from './right/index.js';
import { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';

const MainBox = styled.div`
  height: 100%;

  .hidden {
    width: 0;
  }
`;
const PageMain = styled.div`
  display: flex;
  top: 0;
  align-items: ${(props) => (props.main ? 'center' : 'none')};
`;
const PageLeft = styled.div`
  width: ${(props) => (props.main ? '100%' : '60%')};
  height: 100%;
`;
const PageRight = styled.div`
  width: ${(props) => (props.main ? '0' : '40%')};
`;
const PageFooter = styled.div``;

const Main = ({
  login,
  admin,
  listData,
  listAllPage,
  listSearch,
  listPage,
  changePage,
  userId,
  data,
  date,
  joinNum,
  getData,
  categoryData,
  userName,
  loginCheck,
  setPageMain,
  pageMain,
  pageRight,
  setPageRight,
  setPageLeft,
  getBoardJoinData,
  writerName,
  joinExist,
  getJoinExist,
  setJoinExist,
  writerPay,
  toggleMapModal,
  toggleCalcModal,
  setWriterMapData,
  userNum,
  setPageFooter,
}) => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');

  const [writerLat, setWriterLat] = useState(0);
  const [writerLon, setWriterLon] = useState(0);

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

  // 지도

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
    setPageLeft: setPageLeft,
    setPageMain: setPageMain,
  });
  const WriteModifyWithProps = withProps(Write, {
    getContents: getContents,
    getTitles: getTitles,
    contents: contents,
    title: title,
    getModifyData: getModifyData,
    setPageLeft: setPageLeft,
    setPageMain: setPageMain,
  });
  const SignUpWithProps = withProps(SignUp, {
    setPageLeft: setPageLeft,
    setPageMain: setPageMain,
    setPageRight: setPageRight,
  });
  const ViewWithProps = withProps(View, {
    admin: admin,
    data: data,
    date: date,
    getData: getData,
    userName: userName,
    setPageMain: setPageMain,
    setPageLeft: setPageLeft,
    joinNum: joinNum,
    userNum: userNum,
    setPageFooter: setPageFooter,
  });
  const RightWriteWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    userName: userName,
    getLocation: getLocation,
    userNum: userNum,
  });
  const RightWriteModifyWithProps = withProps(RightWrite, {
    contents: contents,
    categoryData: categoryData,
    userName: userName,
    getLocation: getLocation,
    userNum: userNum,
  });
  const RightReplyWithProps = withProps(Reply, {
    data: data,
    login: login,
    admin: admin,
    loginCheck: loginCheck,
    userId: userId,
    joinExist: joinExist,
    userName: userName,
    writerName: writerName,
  });
  const FooterWithProps = withProps(Footer, {
    userName: userName,
    writerName: writerName,
    joinNum: joinNum,
    writerPay: writerPay,
    joinExist: joinExist,
    loginCheck: loginCheck,
    getJoinExist: getJoinExist,
    getData: getData,
    writerLat: writerLat,
    writerLon: writerLon,
    setJoinExist: setJoinExist,
    setWriterMapData: setWriterMapData,
    toggleMapModal: toggleMapModal,
    data: data,
    getWriterMapData: getWriterMapData,
    getBoardJoinData: getBoardJoinData,
    login: login,
    getLocation: getLocation,
    toggleCalcModal: toggleCalcModal,
  });

  return (
    <MainBox main={pageMain}>
      <PageMain>
        <PageLeft main={pageMain}>
          <Routes>
            <Route path='/' element={<ListWithProps />}></Route>
            <Route path='/write' element={<WriteWithProps />}></Route>
            <Route
              path='/write/modify/:data'
              element={<WriteModifyWithProps />}
            ></Route>
            <Route path='/signup' element={<SignUpWithProps />}></Route>
            <Route path='/view/:data' element={<ViewWithProps />}></Route>
          </Routes>
        </PageLeft>
        <PageRight main={pageMain} className={pageRight}>
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
        </PageRight>
      </PageMain>
      <PageFooter>
        <Routes>
          <Route
            path='/view/:data'
            element={<FooterWithProps></FooterWithProps>}
          ></Route>
        </Routes>
      </PageFooter>
    </MainBox>
  );
};
export default Main;
