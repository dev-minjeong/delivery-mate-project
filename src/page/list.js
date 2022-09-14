import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoImg, UserImg } from '../img/index.js';

const ListContainer = styled.div`
  /* padding-bottom: 40px; */
`;
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  line-height: 40px;
  margin: 6vh 6vw 0;
  padding: 15px 25px 25px 25px;
  border-radius: 10px;
  box-shadow: 2px 1px 10px 0px rgba(0, 0, 0, 0.2);
  .list-info {
    display: flex;
    flex-wrap: wrap;
  }
  .list-info div {
    margin-right: 20px;
    color: gray;
    font-size: 15px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 3px;
    }
  }
  .list-title {
    color: black;
  }
`;
const ListNotData = styled.div`
  margin-top: 50px;
  color: #ababab;
  text-align: center;
`;
const PageingBox = styled.div`
  align-items: center;
  margin-top: 10px;
  div {
    padding: 15px;
    text-align: center;
  }
  div .page-num {
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
  }
`;

function List({ listData, listAllPage, listSearch, listPage, changePage }) {
  // const [userImgSrc, setUserImgSrc] = useState('');
  // useEffect(() => {}, [])
  return (
    <ListContainer>
      <div>
        {listData !== '[]' && listData.length > 0 ? (
          JSON.parse(listData).map((el, key) => {
            const view_url = '/view/' + el.board_id;
            const num = el.writer_id % 10;

            return (
              <ListBox key={key}>
                <div className='list-info'>
                  <div className='list-writer'>
                    <img src={UserImg.images[num]} alt='user-img' />
                    {el.writer_name}
                  </div>
                  <div className='list-join'>
                    <img src={LogoImg} alt='logo-img' />
                    {' ' + el.join_cnt}
                  </div>
                  <div className='list-date'>
                    {`${el.date?.slice(0, 4)} ${el.date?.slice(5, 10)}`}
                  </div>
                </div>
                <Link to={view_url}>
                  <h3 className='list-title'>{el.title}</h3>
                </Link>
              </ListBox>
            );
          })
        ) : (
          <ListNotData>
            {listSearch && listSearch !== '' ? (
              <div>{`'${listSearch}'에 대한 `}검색 결과가 없습니다</div>
            ) : (
              <div>게시글이 없습니다</div>
            )}
          </ListNotData>
        )}
      </div>

      <PageingBox>
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
        </div>
      </PageingBox>
    </ListContainer>
  );
}

export default List;
