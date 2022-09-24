import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Search } from './index.js';
import { AiFillEdit } from 'react-icons/ai';

const Header = ({ login, listSearch, pageLeft, loginCheck }) => {
  const handleHeader = () => {
    window.location.href = '/';
    sessionStorage.removeItem('page');
    sessionStorage.setItem('category', '');
  };
  return (
    <HeaderBox view={pageLeft}>
      <div className='header-left'>
        <Routes>
          <Route path='/' />
        </Routes>
        <h3 className='logo-title' onClick={() => handleHeader()} to='/'>
          배달메이트
        </h3>
      </div>
      <div className='header-right'>
        {pageLeft ? <Search search={listSearch}></Search> : <div></div>}
        {login ? (
          <Link to='/write'>
            <WriteBtn title='글 작성하기'>
              <AiFillEdit className='write-btn'></AiFillEdit>
            </WriteBtn>
          </Link>
        ) : (
          <WriteBtn title='글 작성하기' onClick={() => loginCheck()}>
            <AiFillEdit className='write-btn'></AiFillEdit>
          </WriteBtn>
        )}
      </div>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  height: ${(props) => (props.view ? '14vh' : '16vh')};
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 30px 40px;
  .logo-title {
    color: black;
    cursor: pointer;
    font-size: 23px;
    font-weight: 900;
    font-family: 'nixgon';
    line-height: 38px;
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

export default Header;
