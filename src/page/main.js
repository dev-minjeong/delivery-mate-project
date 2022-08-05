import { Routes, Route } from 'react-router-dom';
import { Write, List, View, SignUp } from './index.js';
import { RightWrite } from './right/index.js';
import { Category } from './left/index.js';
import { useState, Component } from 'react';

import './main.css';

const Main = (login) => {
  const [category, setCategory] = useState('');
  const [change_Category, setChange_Category] = useState(false);
  const [contents, setContents] = useState('');

  const withProps = (Component, props) => {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
  };
  const changeCategory = (target) => {
    setCategory(target);
    sessionStorage.setItem('category', target);
  };
  // category === null || console.log(category);
  const changeState = () => {
    setChange_Category(true);
  };
  const getContents = (val) => {
    const contents = val.trim();
    setContents(contents);
  };

  const ListWithProps = withProps(List, { category: category });
  const WriteWithProps = withProps(Write, {
    getContents: getContents,
    contents: contents,
  });
  const RightWriteWithProps = withProps(RightWrite, { contents: contents });
  // alert(contents);

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
              />
            }
          ></Route>
        </Routes>
      </div>
      <div id='main-center'>
        <Routes>
          <Route path='/' element={<ListWithProps />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route path='/write' element={<WriteWithProps />}></Route>
          <Route path='/view/:data' element={<View />}></Route>
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
