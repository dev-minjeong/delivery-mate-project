import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { Category } from './index.js';
import { LogOutImg, UserImg } from '../../img/index.js';

const SideBox = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 30px 0;
  width: ${(props) => (props.visible ? '20vw' : '0')};
  min-width: ${(props) => (props.visible ? '170px' : '0')};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const AdminBox = styled.div`
  img {
    width: 60px;
    height: 60px;
  }
`;
const LoginList = styled.ul`
  margin-top: 15px;
  .user-name {
    font-size: 15px;
    font-weight: bold;
  }
  .user-email {
    font-size: 12px;
    color: #ababab;
    box-sizing: border-box;
  }
  .login-or-signup {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    li {
      cursor: pointer;
      margin: 0 5px;
    }
  }
`;
const OtherBox = styled.div`
  li {
    cursor: pointer;
  }
  .logout-btn {
    color: #ababab;
    font-size: 13px;
  }
`;

const Side = ({
  login,
  handleLogout,
  toggleLoginModal,
  changeCategory,
  admin,
  userName,
  userEmail,
  userNum,
  pageLeft,
}) => {
  const [userImgSrc, setUserImgSrc] = useState('');

  useEffect(() => {
    const num = userNum % 10;
    setUserImgSrc(UserImg.images[num]);
  }, [userNum]);

  const openModal = () => {
    return toggleLoginModal(true);
  };
  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      handleLogout();

      sessionStorage.removeItem('page');
      sessionStorage.setItem('cagtegory', '');
      return (window.location.href = '/');
    }
  };
  return (
    <SideBox visible={pageLeft}>
      <div>
        <AdminBox>
          {login ? (
            <img src={userImgSrc} alt='user-img'></img>
          ) : (
            <img src={LogOutImg} alt='logout'></img>
          )}
          <LoginList>
            {login ? (
              <div>
                <li className='user-name'>{userName}</li>
                <li className='user-email'>{userEmail}</li>
              </div>
            ) : (
              <div className='login-or-signup'>
                <li className='btn-cursor' onClick={() => openModal()}>
                  로그인
                </li>
                <b>/</b>
                <li>
                  <Link to='signup'> 회원가입</Link>
                </li>
              </div>
            )}
          </LoginList>
        </AdminBox>
        <Category
          changeCategory={changeCategory}
          login={login}
          admin={admin}
        ></Category>
      </div>

      <OtherBox>
        {login ? (
          <li className='logout-btn' onClick={() => logout()}>
            로그아웃
          </li>
        ) : null}
      </OtherBox>
    </SideBox>
  );
};
export default Side;
