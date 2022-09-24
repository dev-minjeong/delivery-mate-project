import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import { PageMove } from '../inc/index.js';
import { LogoImg, UserImg } from '../img';

function View({
  admin,
  data,
  date,
  getData,
  userName,
  setPageLeft,
  setPageMain,
  joinNum,
}) {
  const params = useParams();

  const [modifyUrl, setModifyUrl] = useState('');
  const [userImgSrc, setUserImgSrc] = useState('');

  useEffect(() => {
    setPageLeft(false);
    setPageMain(false);

    const boardId = params.data;
    addViewCnt(boardId);
    if (!data) {
      getData(boardId);
    }
    if (data.data) {
      setModifyUrl(`/write/modify/${data.data[0].board_id}`);

      const num = data.data[0].writer_id % 10;
      setUserImgSrc(UserImg.images[num]);
    }
  }, [data]);

  const addViewCnt = async (boardId) => {
    await axios('https://delivery-mate.herokuapp.com/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardId },
    });
  };
  const removeView = async () => {
    if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      const boardId = params.data;
      await axios('https://delivery-mate.herokuapp.com/delete/board', {
        method: 'POST',
        headers: new Headers(),
        data: { board_id: boardId },
      });
      alert('게시글이 삭제되었습니다.');
      return (window.location.href = '/');
    }
  };
  const changeViewPage = (url) => {
    if (url === 'null_pre') {
      return alert('첫 게시물 입니다');
    } else if (url === 'null_next') {
      return alert('마지막 게시물 입니다');
    }
    return (window.location.href = url);
  };
  return (
    <>
      <div>
        {data.data ? (
          <ViewBox>
            <TitleBox>
              <h3>{data.data[0].title}</h3>
              <div className='board-info-box'>
                <div className='nick-name'>
                  <img alt='' src={userImgSrc} className='nick-img'></img>
                  <p name='title'>{data.data[0].writer_name}</p>
                </div>
                <div className='join-cnt'>
                  {' '}
                  <img alt='' src={LogoImg} className='logo-img'></img>{' '}
                  <p>{joinNum} join</p>
                </div>
              </div>
            </TitleBox>
            <ContentsBox>
              <div
                id='content-txt'
                dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
              ></div>
              <div className='contents-info'>
                {admin === 'Y' || userName === data.data[0].writer_name ? (
                  <div className='edit-board'>
                    <Link to={modifyUrl}>
                      <input type='button' value='수정'></input>
                    </Link>
                    <input
                      type='button'
                      value='삭제'
                      onClick={() => removeView()}
                    ></input>
                  </div>
                ) : (
                  <div></div>
                )}

                <div>
                  <span>{date}</span>
                  <span>조회수: {data.data[0].view_cnt}</span>
                </div>
              </div>
            </ContentsBox>

            <PageMove changeViewPage={changeViewPage}></PageMove>
          </ViewBox>
        ) : null}
      </div>
    </>
  );
}

const ViewBox = styled.div`
  position: fixed;
  width: 60vw;
  height: 72vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 3vh 5vw 3vh 10vw;
`;
const TitleBox = styled.div`
  flex-basis: 20%;
  border-bottom: 1px solid #ababab;
  h3 {
    margin: 20px 10px 0 0;
  }
  .board-info-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
    div {
      display: flex;

      height: 25px;
      margin-right: 17px;

      img {
        width: 25px;
        height: 25px;
        margin-right: 7px;
      }
      p {
        color: darkgray;
        font-size: 13px;
        line-height: 30px;
      }
    }
  }
`;
const ContentsBox = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  #content-txt {
    padding: 20px;
    font-size: 15px;
    font-weight: bold;
  }
  .contents-info {
    display: flex;
    justify-content: space-between;
    span {
      color: darkgray;
      font-size: 13px;
      margin-left: 10px;
    }
    .edit-board {
      input {
        font-size: 13px;
        color: whitesmoke;
        background-color: #2b2b2b;
        width: 40px;
        margin-right: 7px;
        padding: 3px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;

export default View;
