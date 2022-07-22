import axios from 'axios';

import './main.css';
import { useEffect } from 'react';

function View() {
  useEffect(() => {
    gettingData();
  }, []);

  const gettingData = async () => {
    const board_id = window.match.params.data;
    const getData = await axios('/get/board_data', {
      method: 'POST',
      headers: new Headers(),
      data: { id: board_id },
    });
    console.log(getData);
  };
  return <div>View Page</div>;
}
export default View;
