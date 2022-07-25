import axios from 'axios';

import './main.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const board_data = useParams();

  useEffect(() => {
    gettingData();
  }, []);

  const gettingData = async () => {
    const board_id = board_data.data;
    const getData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
    console.log(getData);
  };
  return <div>View Page</div>;
};
export default View;
