import { Routes, Route, Link } from 'react-router-dom';
import { Home, Write } from './index.js';

import './main.css';

function Main() {
  return (
    <div className='main'>
      <div id='main-left'>
        <h3>Left Side</h3>
      </div>
      <div id='main-center'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/write' element={<Write />}></Route>
        </Routes>
      </div>
      <div id='main-right'>
        <h3>Right Side</h3>
      </div>
    </div>
  );
}
export default Main;
