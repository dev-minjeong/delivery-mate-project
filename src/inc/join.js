import { useState } from 'react';
import styled from 'styled-components';
import { LogoImg, LogOutImg } from '../img';

const JoinBox = styled.div`
  button {
    display: flex;
    justify-content: space-between;
    background-color: whitesmoke;
    width: 150px;
    height: 55px;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 2px 1px 10px 0px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
    }
    .join-img-default {
      display: block;
    }
    .join-img-hover {
      display: none;
    }
    :hover .join-img-default {
      display: none;
    }
    :hover .join-img-hover {
      display: block;
    }
    img {
      width: 55px;
      height: 55px;
      box-sizing: content-box;
    }
    .join-title-default {
      display: block;
    }
    .join-title-hover {
      display: none;
      color: ${(props) => (props.join ? 'gray' : 'black')};
    }
    :hover .join-title-hover {
      display: block;
    }
    :hover .join-title-default {
      display: none;
    }
  }
`;
const JoinTitle = styled.div`
  line-height: 55px;
  font-size: 14px;
  width: 100px;
  span {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    padding-right: 10px;
  }
`;

const Join = ({ userName, writerName, joinExist, gsLocation }) => {
  return (
    <JoinBox join={joinExist}>
      {userName !== writerName ? (
        <button onClick={() => gsLocation()}>
          <img
            className='join-img-default'
            src={!joinExist ? LogOutImg : LogoImg}
            alt='nonejoin'
          ></img>
          <img
            className='join-img-hover'
            src={joinExist ? LogOutImg : LogoImg}
            alt='join'
          ></img>
          <JoinTitle join={joinExist}>
            <span className='join-title-default'>
              {joinExist ? '참여중' : '참여하기'}
            </span>
            <span className='join-title-hover'>
              {joinExist ? '취소하기' : '참여하기'}
            </span>
          </JoinTitle>
        </button>
      ) : null}
    </JoinBox>
  );
};
export default Join;
