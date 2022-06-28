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

  const _addData = async (e) => {
    console.log(
      await axios('/add/data', {
        method: 'POST',
        data: { test: 'Complete!' },
        headers: new Headers(),
      })
    );
  };

  return (
    <div className='App'>
      <h2>
        Hello ~ <u>{host} !!</u>
      </h2>
    </div>
  );
}

export default App;
