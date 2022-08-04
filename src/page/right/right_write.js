import axios from 'axios';

import '../main.css';

function RightWrite(props) {
  const submitBoard = async () => {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = props.contents;

    if (title === '') {
      return alert('제목을 입력하세요');
    } else if (contents === '') {
      return alert('내용을 입력하세요');
    }
    const data = { title: title, contents: contents };
    const res = await axios('/add/board', {
      method: 'POST',
      data: data,
      headers: new Headers(),
    });
    if (res.data) {
      alert('글이 게시되었습니다');
      return window.location.replace('/');
    }
  };

  return (
    <div>
      <div id='post-submit'>
        <button onClick={() => submitBoard()}>게시글 올리기</button>
      </div>
    </div>
  );
}
export default RightWrite;
