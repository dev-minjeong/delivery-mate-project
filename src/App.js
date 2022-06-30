/* 
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: '',
    };
  }

  componentDidMount() {
    this._getHost();
  }

  _getHost = async () => {
    const res = await axios.get('/api/host');
    this.setState({ host: res.data.host });
  };

  render() {
    return (
      <div className='App'>
        <h3>
          {' '}
          Welcome to <u> {this.state.host} </u> Blog!{' '}
        </h3>
      </div>
    );
  }
}

export default App;
 */

import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  // const [host, setHost] = useState('');
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // _getHost();
    // _dbTest();
    // _addData();
    _getData();
  }, []);
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
  const _addData = async (e) => {
    e.preventDefault();

    const res = await axios('/add/data', {
      method: 'POST',
      data: { data: name },
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

  const _getData = async () => {
    const res = await axios.get('/get/data');
    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);

      return setList(cover);
    }
    setList(res.data);
  };

  return (
    <div className='App'>
      <h2>
        Hello ~ <u>mj😛 !!</u>
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
        {list.length !== 0
          ? list.map((el, key) => {
              return (
                <div
                  key={key}
                  style={{
                    display: 'grid',
                    lineHeight: '40px',
                    gridTemplateColumns: '32% 35%',
                    width: '50%',
                    marginLeft: '25%',
                  }}
                >
                  <div>{el.id}</div>
                  <div>{el.name}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
