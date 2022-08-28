import axios from 'axios';

import '../main.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RightWrite({
  contents,
  categoryData,
  selectCategory,
  selectCategoryData,
  login,
}) {
  const params = useParams();
  useEffect(() => {
    if (params.data && !selectCategory) {
      selectCategoryData(params.data);
    }
  }, []);

  const submitBoard = async () => {
    const title = document.getElementsByName('title')[0].value.trim();
    const category = selectCategory;

    if (title === '') {
      return alert('제목을 입력하세요');
    } else if (contents === '') {
      return alert('내용을 입력하세요');
    } else if (category === '') {
      return alert('카테고리를 선택하세요');
    }
    if (!params.data) {
      const data = {
        title: title,
        contents: contents,
        category: category,
        writer_id: login,
      };
      const res = await axios('/add/board', {
        method: 'POST',
        data: data,
        headers: new Headers(),
      });
      if (res.data) {
        alert('글이 게시되었습니다');
        return window.location.replace('/');
      }
    } else {
      const data = {
        title: title,
        contents: contents,
        category: category,
        board_id: params.data,
        writer_id: login,
      };
      const res = await axios('/update/board', {
        method: 'POST',
        data: data,
        headers: new Headers(),
      });
      if (res.data) {
        alert('글이 수정되었습니다');
        const url = '/view/' + params.data;

        sessionStorage.setItem('category', category);
        return (window.location.href = url);
      }
    }
  };
  return (
    <div>
      <div className='select-category-box'>
        <h4>카테고리 선택</h4>
        <select
          name='select-category'
          onChange={() => selectCategoryData()}
          value={selectCategory}
        >
          <option value=''>- 카테고리 선택 -</option>
          {categoryData
            ? categoryData.map((el, key) => {
                return (
                  <option value={el.id} key={key}>
                    {el.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      <div id='post-submit'>
        <button onClick={() => submitBoard()}>
          {!params.data ? '게시글 올리기' : '게시글 수정'}
        </button>
      </div>
    </div>
  );
}
export default RightWrite;
