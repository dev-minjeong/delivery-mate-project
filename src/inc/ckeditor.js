import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';

function Ckeditor() {
  return (
    <div className='CKEditor'>
      <CKEditor
        editor={ClassicEditor}
        data='<p> </p>'
        onReady={(editor) => {
          console.log('편집기 사용 가능합니다', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getDate();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur ', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus ', editor);
        }}
      ></CKEditor>
    </div>
  );
}

export default Ckeditor;
