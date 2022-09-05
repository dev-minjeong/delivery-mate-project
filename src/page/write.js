import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Ckeditor } from './../inc/index.js';
function Write(props) {
  const params = useParams();
  useEffect(() => {
    props.resizePage('write-left', 'write-main', 'write-right');
    if (params.data && props.title.length === 0) {
      props.getModifyData(params.data);
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
          defaultValue={props.title}
          onBlur={() => props.getTitles()}
        ></input>
      </div>
      <div id='contents'>
        <Ckeditor
          getContents={props.getContents}
          contents={props.contents}
        ></Ckeditor>
      </div>
    </div>
  );
}
export default Write;
