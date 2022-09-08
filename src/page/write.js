import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Ckeditor } from './../inc/index.js';
import '../css/main.css';

function Write({
  getContents,
  getTitles,
  contents,
  title,
  getModifyData,
  resizePage,
}) {
  const params = useParams();
  useEffect(() => {
    resizePage('write-left', 'write-main', 'write-right');
    if (params.data && title.length === 0) {
      getModifyData(params.data);
    }
  }, []);
  return (
    <div className='write'>
      <div id='title'>
        <input
          type='text'
          autoComplete='off'
          name='title'
          placeholder='제목'
          defaultValue={title}
          onBlur={() => getTitles()}
        ></input>
      </div>
      <div id='contents'>
        <Ckeditor getContents={getContents} contents={contents}></Ckeditor>
      </div>
    </div>
  );
}
export default Write;
