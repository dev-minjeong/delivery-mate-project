import axios from 'axios';

import '../main.css';

function RightWrite() {
  const submitBoard = async () => {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = document.getElementsByName('contents')[0].value.trim();

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
