import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoHomeOutline,
} from 'react-icons/io5';
const OtherBox = styled.div`
  flex-basis: 20%;
  display: flex;
  justify-content: space-between;
  padding-top: 5%;
  .home-btn {
    font-size: 19px;
    margin-top: 5px;
    color: #525252;
  }
`;
const PageMoveBox = styled.div`
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  color: #525252;
  svg {
    font-size: 17px;
  }
  p {
    color: #525252;
  }
  :hover {
    color: #2b2b2b;
    p {
      color: #2b2b2b;
    }
  }
`;

const PageMove = ({ changeViewPage }) => {
  const [preUrl, setPreUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [preView, setPreView] = useState('');
  const [nextView, setNextView] = useState('');

  const params = useParams();
  useEffect(() => {
    const boardId = params.data;
    if (preView.length) {
      setPreUrl(`/view/${preView[0].board_id}`);
    }
    if (nextView.length) {
      setNextUrl(`/view/${nextView[0].board_id}`);
    }
    if (preView === '' || nextView === '') {
      getPreNextData(boardId);
    }
  }, [nextView, preView]);
  const getPreNextData = async (board_id) => {
    const category = sessionStorage.getItem('category');

    const res = await axios('/get/pre_next', {
      method: 'POST',
      headers: new Headers(),
      data: { board_id: board_id, category: category },
    });
    setPreView(res.data.pre);
    setNextView(res.data.next);
  };
  return (
    <OtherBox>
      <PageMoveBox
        onClick={() =>
          preUrl ? changeViewPage(preUrl) : changeViewPage('null_pre')
        }
      >
        <IoArrowBackCircleOutline className='pre-btn'></IoArrowBackCircleOutline>
        {preView.length > 0 ? (
          preView[0].title.length > 5 ? (
            <p>{`${preView[0].title.slice(0, 5)}..`}</p>
          ) : (
            <p>{preView[0].title}</p>
          )
        ) : (
          <p>이전글이 없습니다.</p>
        )}
      </PageMoveBox>
      <IoHomeOutline
        className='home-btn'
        onClick={() => (window.location.href = '/')}
      ></IoHomeOutline>
      <PageMoveBox
        onClick={() =>
          nextUrl ? changeViewPage(nextUrl) : changeViewPage('null_next')
        }
      >
        <IoArrowForwardCircleOutline className='next-btn'></IoArrowForwardCircleOutline>

        {nextView.length > 0 ? (
          nextView[0].title.length > 5 ? (
            <p>{`${nextView[0].title.slice(0, 5)}..`}</p>
          ) : (
            <p>{nextView[0].title}</p>
          )
        ) : (
          <p>다음글이 없습니다.</p>
        )}
      </PageMoveBox>
    </OtherBox>
  );
};
export default PageMove;
