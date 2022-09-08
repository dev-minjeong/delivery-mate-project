import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const PageMove = () => {
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
  }, []);

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

  const changeViewPage = (url) => {
    if (url === 'null_pre') {
      return alert('첫 게시물 입니다');
    } else if (url === 'null_next') {
      return alert('마지막 게시물 입니다');
    }
    return (window.location.href = url);
  };
  return (
    <div className='other-box'>
      <div className='pre-view'>
        <p>이전글</p>
        <div
          className='pre-btn'
          onClick={() =>
            preUrl ? changeViewPage(preUrl) : changeViewPage('null_pre')
          }
        >
          ◀
        </div>
        <div className='pre-title'>
          {preView.length > 0 ? (
            preView[0].title.length > 5 ? (
              `${preView[0].title.slice(0, 5)}..`
            ) : (
              preView[0].title
            )
          ) : (
            <p>이전글이 없습니다.</p>
          )}
        </div>
      </div>
      <input
        type='button'
        value='목록'
        id='view-list-btn'
        onClick={() => (window.location.href = '/')}
      ></input>
      <div className='next-view'>
        <p>다음글</p>
        <div
          className='next-btn'
          onClick={() =>
            nextUrl ? changeViewPage(nextUrl) : changeViewPage('null_next')
          }
        >
          ▶
        </div>
        <div className='next-title'>
          {nextView.length > 0 ? (
            nextView[0].title.length > 5 ? (
              `${nextView[0].title.slice(0, 5)}..`
            ) : (
              nextView[0].title
            )
          ) : (
            <p>다음글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default PageMove;
