import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';

function Ckeditor({ getContents, contents }) {
  return (
    <div className='CKEditor'>
      <CKEditor
        editor={ClassicEditor}
        data={contents}
        onBlur={(event, editor) => {
          const data = editor.getData();
          getContents(data);
        }}
        onFocus={(event, editor) => {
          console.log('Focus ', editor);
        }}
      ></CKEditor>
    </div>
  );
}

export default Ckeditor;
