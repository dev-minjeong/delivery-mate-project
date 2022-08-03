import { Ckeditor } from './../inc/index.js';
function Write() {
  return (
    <div className='write'>
      <div id='title'>
        <input type='text' name='title' placeholder='제목'></input>
      </div>
      <div id='contents'>
        <Ckeditor></Ckeditor>
      </div>
    </div>
  );
}
export default Write;
