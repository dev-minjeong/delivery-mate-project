import axios from 'axios';
import { useEffect, useState } from 'react';

import '../main.css';
import { Link } from 'react-router-dom';
import { async } from 'q';

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

  const addCategory = async () => {
    let categoryName = window.prompt('추가할 카테고리를 입력하세요');
    if (categoryName) {
      categoryName = categoryName.trim();

      if (categoryName !== '' && categoryName.length > 0) {
        const add = await axios('/add/category', {
          method: 'POST',
          data: { name: categoryName },
          headers: new Headers(),
        });
        // console.log(add.data.msg);
        alert(add.data.msg);
        getCategoryData();
      } else {
        return alert('추가할 카테고리를 입력하세요');
      }
    }
  };

  const removeCategory = async (category) => {
    if (window.confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
      const remove = await axios('/delete/category', {
        method: 'POST',
        data: category,
        headers: new Headers(),
      });
      if (remove) {
        alert(`"${category.name}" 카테고리가 삭제되었습니다`);
        getCategoryData();
      }
    }
  };

  const modifyCategory = async (category) => {
    let modifyName = document.getElementsByName('modify_' + category.id)[0]
      .value;
    modifyName = modifyName.trim();

    if (modifyName !== '' && modifyName.length > 0) {
      if (category.name === modifyName) {
        return alert('수정 시 다른 카테고리 명으로 입력하세요');
      }
      if (
        window.confirm(
          `"${category.name}"카테고리를 "${modifyName}"카테고리로 수정하시겠습니까?`
        )
      ) {
        const data = { id: category.id, name: modifyName };
        const modify = await axios('/modify/category', {
          method: 'POST',
          data: data,
          headers: new Headers(),
        });
        alert(modify.data.msg);
        getCategoryData();
      }
    } else {
      return alert('카테고리 이름을 최소 1글자 이상 입력하세요');
    }
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
                onClick={() => addCategory()}
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
                    <button
                      className='remove-btn'
                      onClick={() => removeCategory(el)}
                    >
                      ❌
                    </button>
                    <input
                      type='text'
                      maxLength='20'
                      className='input-edit'
                      name={'modify_' + el.id}
                      defaultValue={el.name}
                    ></input>
                    <button
                      className='modify-btn'
                      onClick={() => modifyCategory(el)}
                    >
                      ⭕
                    </button>
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
