import React from 'react';
import './main.css';
import { Search } from './index.js';
import { Link } from 'react-router-dom';

function List({ listData, listAllPage, listSearch, listPage, changePage }) {
  return (
    <div className='list'>
      <div className='list-title list-box'>
        <div>제목</div>
        <div>닉네임</div>
        <div className='acenter'>날짜</div>
      </div>
      {listData !== '[]' && listData.length > 0 ? (
        JSON.parse(listData).map((el, key) => {
          const view_url = '/view/' + el.board_id;
          return (
            <div className='list-data list-box' key={key}>
              <div>
                <Link to={view_url}>{el.title}</Link>
              </div>
              <div className='views'>{el.writer_name}</div>
              <div className='acenter'>{el.date?.slice(5, 10)}</div>
            </div>
          );
        })
      ) : (
        <div className='not-data acenter'>
          {listSearch && listSearch !== '' ? (
            <div>{`'${listSearch}'에 대한 `}검색 결과가 없습니다</div>
          ) : (
            <div>게시글이 없습니다</div>
          )}
        </div>
      )}
      <div className='paging-div'>
        <div></div>
        <div>
          <ul>
            {listAllPage
              ? listAllPage.map((el, key) => {
                  return el === listPage ? (
                    <li key={key} className='page-num'>
                      <b>{el}</b>
                    </li>
                  ) : (
                    <li
                      key={key}
                      className='page-num'
                      onClick={() => changePage(el)}
                    >
                      {el}
                    </li>
                  );
                })
              : null}
          </ul>
          <Search search={listSearch}></Search>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default List;
