import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MdDelete, MdCheck } from 'react-icons/md';

function Category({ changeCategory, login, admin }) {
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const getData = await axios(
      'https://delivery-mate.herokuapp.com/get/category'
    );
    setCategory(getData.data);
  };
  const addCategory = async () => {
    let categoryName = window.prompt('추가할 카테고리를 입력하세요');
    if (categoryName) {
      categoryName = categoryName.trim();

      if (categoryName !== '' && categoryName.length > 0) {
        const add = await axios(
          'https://delivery-mate.herokuapp.com/add/category',
          {
            method: 'POST',
            data: { name: categoryName },
            headers: new Headers(),
          }
        );
        alert(add.data.msg);
        console.log(add);
        getCategoryData();
      } else {
        return alert('추가할 카테고리를 입력하세요');
      }
    }
  };
  const removeCategory = async (category) => {
    if (window.confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
      const remove = await axios(
        'https://delivery-mate.herokuapp.com/delete/category',
        {
          method: 'POST',
          data: category,
          headers: new Headers(),
        }
      );
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
        return alert('변경 시 다른 카테고리 명으로 입력하세요');
      }
      if (
        window.confirm(
          `"${category.name}"카테고리를 "${modifyName}"로 수정하시겠습니까?`
        )
      ) {
        const data = { id: category.id, name: modifyName };
        const modify = await axios(
          'https://delivery-mate.herokuapp.com/modify/category',
          {
            method: 'POST',
            data: data,
            headers: new Headers(),
          }
        );
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

  return (
    <CategoryBox>
      <ul>
        <li>
          <Link
            to='/'
            className={pre_food === '' ? 'pre-food' : null}
            onClick={() => changeCategory('')}
          >
            전체보기
          </Link>

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
                  <EditCategory key={key}>
                    <MdCheck
                      className='category-modify'
                      onClick={() => modifyCategory(el)}
                    ></MdCheck>
                    <input
                      type='text'
                      maxLength='10'
                      className='category-input'
                      name={'modify_' + el.id}
                      defaultValue={el.name}
                    ></input>
                    <MdDelete
                      className='category-remove'
                      onClick={() => removeCategory(el)}
                    ></MdDelete>
                  </EditCategory>
                );
              }
            })
          : null}
        {login && admin === 'Y' ? (
          !edit ? (
            <input
              type='button'
              value='카테고리 수정'
              className='category-edit'
              onClick={() => setEdit(!edit)}
            ></input>
          ) : (
            <input
              type='button'
              value='카테고리 추가'
              className='category-edit'
              onClick={() => addCategory()}
            ></input>
          )
        ) : null}
      </ul>
    </CategoryBox>
  );
}

const CategoryBox = styled.div`
  margin-top: 30px;
  li {
    margin-top: 20px;
  }
  .pre-food {
    font-weight: bold;
    color: #bbf294;
  }
  .category-edit {
    margin-top: 20px;
    border: 1px solid;
    color: #bbf294;
    margin: 10px 0px 0px 15px;
    padding: 1px 7px;
    border-radius: 4px;
    background-color: inherit;
    cursor: pointer;
  }
`;
const EditCategory = styled.li`
  display: flex;
  justify-content: space-around;
  .category-remove {
    font-size: 20px;
    margin: 7px;
  }
  .category-input {
    width: 90px;
    background-color: whitesmoke;
    padding: 7px;
    border-radius: 10px;
  }
  .category-modify {
    font-size: 20px;
    color: #f27289;
    font-weight: bolder;
    margin: 7px;
  }
`;

export default Category;
