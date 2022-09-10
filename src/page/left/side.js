import { Category } from './index.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserOne, LogOutImg } from '../../img/index.js';
import { useEffect, useState } from 'react';

const SideBox = styled.div`
  width: 20vw;
  min-width: 200px;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 30px 0;
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
  }
`;
const OtherBox = styled.div`
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
}) => {
  const [userImgSrc, setUserImgSrc] = useState('');

  useEffect(() => {
    const num = userNum % 10;
    console.log(num);
    setUserImgSrc(`../../img/user${num}.png`);
  }, [userNum]);

  console.log(userImgSrc);
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
    <SideBox>
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
            <div>
              <li className='btn-cursor' onClick={() => openModal()}>
                로그인
              </li>
              <li>
                <Link to='signup'>회원가입</Link>
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
