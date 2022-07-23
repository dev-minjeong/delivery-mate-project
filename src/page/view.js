import axios from 'axios';

import './main.css';
import { useEffect } from 'react';

const View = (props) => {
  useEffect(() => {
    gettingData();
  }, []);

  const gettingData = async () => {
    const board_id = props;
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
