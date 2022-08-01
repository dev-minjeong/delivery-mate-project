import { Routes, Route } from 'react-router-dom';
import { Write, List, View } from './index.js';
import { RightWrite } from './right/index.js';
import { Category } from './left/index.js';
import { useState, Component } from 'react';

import './main.css';

function Main() {
  const [category, setCategory] = useState('');

  const changeCategory = (target) => {
    setCategory(target);
    sessionStorage.setItem('category', target);
  };
  category === null || console.log(category);

  const withProps = (Component, props) => {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
  };
  const WithPropsList = withProps(List, { category: category });

  return (
    <div className='main'>
      <div id='main-left'>
        <Routes>
          <Route
            path='/'
            element={<Category changeCategory={changeCategory} />}
          ></Route>
        </Routes>
      </div>
      <div id='main-center'>
        <Routes>
          {/* <Route path='/' element={<List />}></Route> */}
          <Route path='/' element={<WithPropsList />}></Route>
        </Routes>
        <Routes>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/view/:data' element={<View />}></Route>
        </Routes>
      </div>
      <div id='main-right'>
        <Routes>
          <Route path='/write' element={<RightWrite />}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default Main;
