import React from 'react';
import axios from 'axios';

import './main.css';
import { useState, useEffect } from 'react';

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const data_list = await axios('/get/board', {
      method: 'GET',
      headers: new Headers(),
    });
    setData(data_list);
  };
  console.log(data);
  return <div></div>;
}

export default List;
