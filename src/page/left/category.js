import axios from 'axios';
import { useEffect, useState } from 'react';

import '../main.css';
import { Link } from 'react-router-dom';

function Category({ changeCategory, login }) {
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const getData = await axios('/get/category');
    setCategory(getData.data);
  };

  let pre_food = '';
  if (sessionStorage.getItem('category')) {
    pre_food = Number(sessionStorage.getItem('category'));
  }
  const currLogin = login.login;

  return (
    <div className='category'>
      <ul>
        <li>
          <Link
            to='/'
            className={pre_food === '' ? 'pre-food' : null}
            onClick={() => changeCategory('')}
          >
            전체보기
          </Link>
          {currLogin ? (
            !edit ? (
              <input
                type='button'
                value='Edit'
                className='category-edit'
                onClick={() => setEdit(!edit)}
              ></input>
            ) : (
              <input
                type='button'
                value='Add'
                className='category-edit'
              ></input>
            )
          ) : null}
          <hr></hr>
        </li>
        {category.length > 0
          ? category.map((el, key) => {
              if (!edit) {
                return (
                  <li key={key}>
                    <Link
                      to='/'
                      className={pre_food === el.id ? 'pre-food' : null}
                      onClick={() => changeCategory(el.id)}
                    >
                      {el.name}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li className='edit-category' key={key}>
                    <button className='remove-btn'>X</button>
                    <input
                      type='text'
                      maxLength='20'
                      className='input-edit'
                      defaultValue={el.name}
                    ></input>
                  </li>
                );
              }
            })
          : null}
      </ul>
    </div>
  );
}

export default Category;
