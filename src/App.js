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
  const [host, setHost] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    _getHost();
    _dbTest();
    _addData();
  }, []);

  const _getHost = async () => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  };

  const _dbTest = async () => {
    const res = await axios.get('/api/test');
    console.log(res.data);
  };

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

  return (
    <div className='App'>
      <h2>
        Hello ~ <u>{host} !!</u>
      </h2>
      <form method='POST' onSubmit={_addData}>
        <input type='text' maxLength='10' onChange={(e) => _nameUpdate(e)} />
        <input type='submit' value='Add' />
      </form>
    </div>
  );
}

export default App;
