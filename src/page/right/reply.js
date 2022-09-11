import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import '../../css/view.css';

function Reply({ data, login, admin, loginCheck, userId }) {
  const params = useParams();
  const [replyData, setReplyData] = useState([]);
  const [replyNum, setReplyNum] = useState(null);

  useEffect(() => {
    const boardId = params.data;
    if (replyNum === null) {
      getReplyData(boardId);
    }
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
    }
    alert('댓글이 삭제되었습니다.');
    return window.location.reload();
  };
  return (
    <div className='reply-box'>
      <h5>댓글</h5>
      <div className='reply-write'>
        <div className='reply-value'>
          <textarea
            rows='3'
            placeholder='댓글 작성 시 참여 가능합니다'
            maxLength='100'
            name='reply-write'
            onClick={() => loginCheck()}
          ></textarea>
          <input type='file'></input>
        </div>

        <input
          type='button'
          value='등록'
          id='reply-submit-btn'
          onClick={() => addReply()}
        ></input>
      </div>
      <div className='reply-list-box'>
        {replyData.length > 0 && replyNum > 0 ? (
          <div>
            <h5>{replyNum}개의 댓글이 있습니다.</h5>
            {replyData.map((el, key) => {
              let nickname = el.user.name;
              if (el.user.admin === 'Y') {
                nickname = '관리자';
              }
              let date = el.date.slice(5, 10) + ' ' + el.date.slice(11, 16);
              return (
                <div className='reply-list' key={key}>
                  <div className='reply-contents'>
                    <div
                      style={
                        el.user.admin === 'Y' ||
                        el.user.name === data.data[0].writer_name
                          ? { fontWeight: 'bold', color: 'blue' }
                          : null
                      }
                      className='reply-list-id'
                    >
                      {nickname}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: el.contents }}
                      className='reply-list-contents'
                    ></div>
                  </div>
                  <div className='reply-delete-date'>
                    {(login && login === el.user.id) || admin === 'Y' ? (
                      <input
                        type='button'
                        value='❌'
                        className='reply-delete-btn'
                        onClick={() => removeReply(el.reply_id)}
                      ></input>
                    ) : (
                      <div></div>
                    )}
                    <div className='reply-list-date'>{date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h5>작성된 댓글이 없습니다.</h5>
        )}
      </div>
    </div>
  );
}
export default Reply;
