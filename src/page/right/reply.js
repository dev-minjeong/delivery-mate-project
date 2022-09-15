import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Loading } from '../index.js';
import { LogoImg, UserImg } from '../../img';
import { RiDeleteBinLine } from 'react-icons/ri';

const ReplyContainer = styled.div`
  height: 71vh;
  width: 40vw;
  padding: 2vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PhoneBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  aspect-ratio: 2 / 3;
  margin-right: 3vh;
  padding: 5vh 1vh;
  border: 2px solid black;
  .reply-title {
    background-color: whitesmoke;
    flex-basis: 6%;
    display: flex;
    justify-content: center;
    padding: 3px;
    border: 2px solid black;
    div {
      border-radius: 20px;
      background-color: #f27289;
      height: 100%;
      color: whitesmoke;
      padding: 0 6px;
      margin-left: 7px;
      font-size: 13px;
    }
  }
`;
const ReplyBox = styled.div`
  height: 50vh;
  overflow-y: auto;
  flex-basis: 80%;
  background-color: white;
  padding: 10px;

  border-right: 2px solid black;
  border-left: 2px solid black;
  .reply-list-box {
    display: flex;
    flex-direction: column;
    .reply-lists-box {
      display: flex;
      .tail {
        font-size: 20px;
        color: whitesmoke;
        line-height: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: whitesmoke;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  margin-top: 10px;
  border-radius: 20px;
  width: 100%;
  padding: 7px 10px;
  div {
    display: flex;
    justify-content: space-between;

    p {
      color: darkgray;
      font-size: 13px;
    }
    span {
      font-size: 15px;
    }
    svg {
      margin-top: 5px;
    }
  }
`;
const ReplyNickNameBox = styled.div`
  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
const ReplyNickName = styled.h5`
  color: ${(props) => (props.writerReply ? '#BBF294' : 'black')};
  font-weight: bold;
`;
const ReplyWrite = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3%;
  flex-basis: 14%;
  background-color: whitesmoke;
  border: 2px solid black;
  .reply-value {
    height: 100%;
    flex-basis: 80%;
    textarea {
      resize: none;
      font-size: 13px;
      line-height: 13px;
      /* line-height: 30%; */
      width: 100%;
      border-radius: 10px;
      padding: 5%;
    }
    padding-right: 4%;
  }
  input {
    flex-basis: 20%;
    height: 60%;
    background-color: #f27289;
    color: white;
    font-weight: bold;
    cursor: pointer;
    aspect-ratio: 5 / 3;
    margin-top: 4%;
  }
`;

function Reply({
  data,
  login,
  admin,
  loginCheck,
  userId,
  writerName,
  userName,
  joinExist,
}) {
  const params = useParams();
  const [replyData, setReplyData] = useState([]);
  const [replyNum, setReplyNum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const boardId = params.data;
    if (replyNum === null) {
      getReplyData(boardId);
    }
    setLoading(false);
  }, []);
  const getReplyData = async (board_id) => {
    const data = await axios('/get/reply_data', {
      method: 'POST',
      headers: new Headers(),
      data: { board_id: board_id },
    });
    setReplyData(data.data.rows);
    setReplyNum(data.data.count);
  };

  const addReply = async () => {
    const boardId = params.data;
    let reply = document.getElementsByName('reply-write')[0].value.trim();
    // 줄바꿈 처리
    reply = reply.replace(/(\n\\r\n)/g, '<br>');

    if (!loginCheck()) {
      return;
    }
    if (reply === '' || reply.length === 0) {
      document.getElementsByName('reply-write')[0].focus();
      document.getElementsByName('reply-write')[0].value = reply;

      return alert('댓글을 입력하세요');
    } else if (reply.split('<br>').length > 5) {
      return alert('5줄 이내의 댓글을 작성하세요.');
    }
    const data = {
      board_id: boardId,
      contents: reply,
      user_id: userId,
    };
    await axios('/add/reply', {
      method: 'POST',
      headers: new Headers(),
      data: data,
    });
    alert('댓글이 등록되었습니다');

    return window.location.reload();
  };
  const removeReply = async (reply_id) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      await axios('/delete/reply', {
        method: 'POST',
        headers: new Headers(),
        data: { reply_id: reply_id },
      });

      alert('댓글이 삭제되었습니다.');
      return window.location.reload();
    }
  };
  return (
    <ReplyContainer>
      <PhoneBox>
        <div className='reply-title'>
          <h5>"{writerName}"님의 채팅방</h5>
          <div>{replyNum}</div>
        </div>

        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            {joinExist || admin === 'Y' || userName === writerName ? (
              <ReplyBox id='reply-box-scroll'>
                {replyData.length > 0 && replyNum > 0 ? (
                  <div className='reply-list-box'>
                    {replyData.map((el, key) => {
                      let nickname = el.user.name;
                      el.user.admin === 'Y' && (nickname = '관리자');
                      let date = el.date.slice(11, 16);
                      let num = el.user.user_id % 10;
                      return (
                        <div className='reply-lists-box' key={key}>
                          {el.user.name === data.data[0].writer_name ? (
                            <span className='tail'>◀</span>
                          ) : null}

                          <ReplyList>
                            <div className='reply-info'>
                              <ReplyNickNameBox>
                                <img
                                  src={
                                    el.user.admin === 'Y'
                                      ? LogoImg
                                      : UserImg.images[num]
                                  }
                                  alt='user-img'
                                />
                                <ReplyNickName
                                  writerReply={
                                    el.user.name === data.data[0].writer_name
                                  }
                                  style={
                                    el.user.admin === 'Y'
                                      ? {
                                          color: '#f27289',
                                        }
                                      : null
                                  }
                                  className='reply-name'
                                >
                                  {nickname}
                                </ReplyNickName>
                              </ReplyNickNameBox>

                              <p className='reply-list-date'>{date}</p>
                            </div>
                            <div className='reply-contents'>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: el.contents,
                                }}
                                className='reply-list-contents'
                              ></span>
                              {(login && login === el.user.id) ||
                              admin === 'Y' ? (
                                <RiDeleteBinLine
                                  className='reply-delete-btn'
                                  onClick={() => removeReply(el.reply_id)}
                                ></RiDeleteBinLine>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </ReplyList>
                          {el.user.name === data.data[0].writer_name ? null : (
                            <span className='tail'>▶</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h5>작성된 댓글이 없습니다.</h5>
                )}
              </ReplyBox>
            ) : (
              <h5>참여 후 댓글을 볼 수 있습니다</h5>
            )}
          </>
        )}

        <ReplyWrite>
          <div className='reply-value'>
            <textarea
              rows='2'
              placeholder='댓글을 입력하세요'
              maxLength='50'
              name='reply-write'
              onClick={() => loginCheck()}
            ></textarea>
          </div>

          <input
            type='button'
            value='등록'
            id='reply-submit-btn'
            onClick={() => addReply()}
          ></input>
        </ReplyWrite>
      </PhoneBox>
    </ReplyContainer>
  );
}
export default Reply;
