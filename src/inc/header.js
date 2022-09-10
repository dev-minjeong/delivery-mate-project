import { Route, Routes, Link } from 'react-router-dom';
import { Search } from '../page/index.js';
import React from 'react';
import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  height: 80px;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 20px 20px 0 20px;
  .logo-title {
    color: #f27289;
    cursor: pointer;
  }
  .header-right {
    display: flex;
  }
`;
const WriteBtn = styled.div`
  cursor: pointer;
  font-size: 14px;
  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 10px;
    background-image: url('https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-pencil-7.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
`;

const Header = ({ login, listSearch }) => {
  const handleHeader = () => {
    window.location.href = '/';
    sessionStorage.removeItem('page');
    sessionStorage.setItem('category', '');
  };
  return (
    <HeaderBox>
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
        <WriteBtn title='글 작성하기'>
          {login ? (
            <Link to='/write'>
              <input type='button' value=''></input>
            </Link>
          ) : null}
        </WriteBtn>
      </div>
    </HeaderBox>
  );
};
export default Header;
