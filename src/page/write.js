function Write() {
  return (
    <div className='write'>
      <div id='title'>
        <input type='text' name='title' placeholder='제목'></input>
      </div>
      <div id='contents'>
        <textarea name='contents' placeholder='내용을 입력하세요'></textarea>
      </div>
    </div>
  );
}
export default Write;
