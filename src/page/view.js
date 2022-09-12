import axios from 'axios';

import '../css/view.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PickupMap, Calculate, Join, PageMove } from './../inc/index.js';
import { Loading } from './index.js';
import styled from 'styled-components';

const ViewBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  /* position: sticky; */
  top: 135px;
`;

function View({
  admin,
  data,
  date,
  joinNum,
  getData,
  userName,
  setPageMain,
  setPageLeft,
  setPageFooter,
  getBoardJoinData,
  getWriterMapData,
  mateData,
  writerLat,
  writerLon,
  writerName,
  joinExist,
  login,
  getJoinExist,
  setJoinExist,
  setBoardId,
}) {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [modifyUrl, setModifyUrl] = useState('');

  useEffect(() => {
    setPageMain(false);
    setPageLeft(false);
    setPageFooter(true);

    const boardId = params.data;
    setBoardId(boardId);
    setPageMain(false);
    getBoardJoinData(boardId);
    getWriterMapData(boardId);
    addViewCnt(boardId);

    if (!data) {
      getData(boardId);
    }
    if (data.data) {
      setModifyUrl(`/write/modify/${data.data[0].board_id}`);
    }
    if (joinExist === null) {
      getJoinInfo();
    }
    if (sessionStorage.join) {
      const storageJoinList = JSON.parse(sessionStorage.join);

      if (storageJoinList.length > 0) {
        mateData.push(
          {
            mate_lat: writerLat,
            mate_lon: writerLon,
            name: writerName,
          },
          ...storageJoinList
        );
        storageJoinList.forEach((el) => {
          if (el.name === userName) {
            setJoinExist(true);
          }
        });
      } else {
        mateData.push({
          mate_lat: writerLat,
          mate_lon: writerLon,
          name: writerName,
        });
      }
    }
    setLoading(false);
  }, [data]);

  // 조회수 카운트
  const addViewCnt = async (boardId) => {
    await axios('/update/view_cnt', {
      method: 'POST',
      headers: new Headers(),
      data: { id: boardId },
    });
  };

  // 게시글
  const removeView = async () => {
    if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      const boardId = params.data;

      await axios('/delete/board', {
        method: 'POST',
        headers: new Headers(),
        data: { board_id: boardId },
      });
      alert('게시글이 삭제되었습니다.');
      return (window.location.href = '/');
    }
  };

  const getJoinInfo = async () => {
    if (login) {
      const boardId = params.data;
      const obj = {
        board_id: boardId,
        name: userName,
      };
      const getData = await axios('/check/join', {
        method: 'POST',
        headers: new Headers(),
        data: obj,
      });
      if (getData.data[0]) {
        return getJoinExist(true);
      }
      getJoinExist(false);
    }
  };
  return (
    <>
      {data.data ? (
        <ViewBox>
          <div className='title-box'>
            {admin === 'Y' || userName === data.data[0].writer_name ? (
              <div className='write-option-box'>
                <Link to={modifyUrl}>
                  <input type='button' value='수정'></input>
                </Link>
                <input
                  type='button'
                  value='삭제'
                  onClick={() => removeView()}
                ></input>
              </div>
            ) : null}
            <input
              type='text'
              id='title-txt'
              name='title'
              defaultValue={data.data[0].title}
              readOnly
            ></input>
            <div className='board-info-box'>
              <div className='user-info'>
                <img alt='' src='' className='nick-img'></img>
                <div className='user-nickname'>{data.data[0].writer_name}</div>
              </div>
              <div className='board-info'>
                <div>조회수: {data.data[0].view_cnt}</div>
                <div>{date}</div>
              </div>
            </div>
          </div>
          <div className='contents-box'>
            <div
              id='content-txt'
              dangerouslySetInnerHTML={{ __html: data.data[0].contents }}
            ></div>
          </div>

          <PageMove></PageMove>
        </ViewBox>
      ) : null}
    </>
  );
}
export default View;
