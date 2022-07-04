import './App.css';
import axios from 'axios';
import { useState, useEffect, Component } from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { Home, Test, Header } from './inc';

function App() {
  // const [host, setHost] = useState('');
  // const [name, setName] = useState('');
  // const [list, setList] = useState([]);
  // const [update, setUpdate] = useState(false);

  /* 
  useEffect(() => {
    // _getHost();
    // _dbTest();
    // _addData();
    _getData();
  }, []);
   */
  /* 
  const _getHost = async () => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  };

  const _dbTest = async () => {
    const res = await axios.get('/api/test');
    console.log(res.data);
  };
 */
  // 데이터 추가
  /* 
  const _addData = async (e) => {
    e.preventDefault();
    const nameInput = name;

    const res = await axios('/add/data', {
      method: 'POST',
      data: { data: nameInput },
      headers: new Headers(),
    });
    if (res.data) {
      alert('데이터 추가!');
      return window.location.reload();
    }
  };
  const _nameUpdate = (e) => {
    setName(e.target.value);
  };
 */
  // 데이터 받아오기
  /* 
  const _getData = async () => {
    const res = await axios.get('/get/data');
    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);

      return setList(cover);
    }
    setList(res.data);
  };
 */
  // 데이터
  /* 
  const _modifyData = async (el) => {
    const modify = prompt(`${el.name}을 무엇으로 변경하겠습니까?`);

    if (modify !== null) {
      const body = {
        name: modify,
        id: el.id,
      };
      const res = await axios('/modify/data', {
        method: 'POST',
        data: { modify: body },
        headers: new Headers(),
      });
      if (res.data) {
        alert(`데이터 수정!`);
        return window.location.reload();
      }
    }
  };
 */
  // 데이터 삭제
  /* 
  const _deleteData = async (el) => {
    const remove = window.confirm(`${el.name}을 삭제하시겠습니까?`);
    if (remove) {
      const body = { id: el.id };
      const res = await axios('/delete/data', {
        method: 'POST',
        data: { delete: body },
        headers: new Headers(),
      });
      if (res.data) {
        alert(`데이터 삭제!`);
        return window.location.reload();
      }
    }
  };

  const dataList = list;
 */
  return (
    <div className='App'>
      <Header></Header>
      {/* 
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/test/:name/:age' element={<Test />}></Route>
          <Route path='/test/:name' element={<Test />}></Route>
          <Route path='/test' element={<Test />}></Route>
        </Routes>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/test'>Test</Link>
          </li>
        </ul>
      </BrowserRouter>
       */}
      {/* <h2>
        Hello ~ <u>mj😛!!</u>
      </h2>
      <form method='POST' onSubmit={_addData}>
        <input type='text' maxLength='10' onChange={(e) => _nameUpdate(e)} />
        <input type='submit' value='Add' />
      </form>
      <br></br>
      <div style={{ height: '250px', overflow: 'auto' }}>
        <h4 style={{ color: '#ababab' }}>Teacher List</h4>
        <div
          style={{
            border: 'solid 1px black',
            width: '50%',
            marginLeft: '25%',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '32% 35% 30%',
              textAlign: 'center',
            }}
          >
            <div>Number</div>
            <div>Name</div>
            <div>Other</div>
          </div>
        </div>
        {dataList.length !== 0
          ? dataList.map((el, key) => {
              return (
                <div
                  key={key}
                  style={{
                    display: 'grid',
                    lineHeight: '40px',
                    gridTemplateColumns: '32% 35% 20% 0%',
                    width: '50%',
                    marginLeft: '25%',
                  }}
                >
                  <div>{el.id}</div>
                  <div>{el.name}</div>
                  <div
                    style={{ color: '#ababab' }}
                    onClick={() => _modifyData(el)}
                  >
                    Modify
                  </div>
                  <div
                    style={{ color: '#ababab' }}
                    onClick={() => _deleteData(el)}
                  >
                    Delete
                  </div>
                </div>
              );
            })
          : null}
      </div> */}
    </div>
  );
}

export default App;
