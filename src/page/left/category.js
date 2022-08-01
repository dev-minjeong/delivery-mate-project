import axios from 'axios';
import { useEffect, useState } from 'react';

import '../main.css';
import { Link } from 'react-router-dom';

function Category({ changeCategory }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const getData = await axios('/get/category');
    setCategory(getData.data);
  };

  return (
    <div className='category'>
      <ul>
        <li>
          <Link to='/' onClick={() => changeCategory('')}>
            전체보기
          </Link>
          <hr></hr>
        </li>
        {category.length > 0
          ? category.map((el, key) => {
              return (
                <li key={key}>
                  <Link to='/' onClick={() => changeCategory(el.id)}>
                    {el.name}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default Category;
