import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Search } from '../page/index.js';
import { AiFillEdit } from 'react-icons/ai';

const HeaderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  height: ${(props) => (props.footer ? '14vh' : '16vh')};
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 30px 40px;
  .logo-title {
    color: black;
    cursor: pointer;
    font-size: 23px;
    font-weight: 900;
  }
  .header-right {
    display: flex;
  }
`;
const WriteBtn = styled.div`
  padding: 6px;
  .write-btn {
    font-size: 27px;
    color: #bbf294;
  }
`;

const Header = ({ login, listSearch, pageMain, pageFooter }) => {
  const handleHeader = () => {
    window.location.href = '/';
    sessionStorage.removeItem('page');
    sessionStorage.setItem('category', '');
  };
  return (
    <HeaderBox main={pageMain} footer={pageFooter}>
      <div className='header-left'>
        <Routes>
          <Route path='/' />
        </Routes>
        <h3 className='logo-title' onClick={() => handleHeader()} to='/'>
          배달메이트
        </h3>
      </div>
      <div className='header-right'>
        <Search search={listSearch}></Search>
        <WriteBtn title='글 작성하기' main={pageMain}>
          {login ? (
            <Link to='/write'>
              <AiFillEdit className='write-btn'></AiFillEdit>
            </Link>
          ) : null}
        </WriteBtn>
      </div>
    </HeaderBox>
  );
};
export default Header;
