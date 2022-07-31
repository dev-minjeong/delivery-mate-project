import { Routes, Route } from 'react-router-dom';
import { Write, List, View } from './index.js';
import { RightWrite } from './right/index.js';
import { Category } from './left/index.js';
import { useState } from 'react';

import './main.css';

function Main() {
  const [category, setCategory] = useState('');

  const changeCategory = (target) => {
    setCategory(target);
    sessionStorage.setItem('category', target);
  };
  category === null || console.log(category);

  const withProps = (Element, props) => {
    return function (matchProps) {
      return <Element {...props} {...matchProps} />;
    };
  };

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
          <Route
            path='/'
            element={withProps(List, { category: category })}
          ></Route>
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
