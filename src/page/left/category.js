import axios from 'axios';
import { useEffect, useState } from 'react';

import '../main.css';

function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const getData = await axios('/get/category');
    setCategory(getData.data);
  };
  console.log(category);
  return (
    <div className='category'>
      <ul>
        <li>
          <u>전체보기</u>
          <hr></hr>
        </li>
        {category.length > 0
          ? category.map((el, key) => {
              return (
                <li key={key}>
                  <u>{el.name}</u>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default Category;
