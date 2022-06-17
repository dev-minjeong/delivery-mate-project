import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [host, setHost] = useState('');

  useEffect(() => {
    _getHost();
  }, []);

  const _getHost = async () => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  };

  return (
    <div className='App'>
      <h2>
        Hello <u>{host}</u>
      </h2>
    </div>
  );
}

export default App;
