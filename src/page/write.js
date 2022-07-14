function Write() {
  return (
    <div className='write'>
      <div id='title'>
        <input type='text' placeholder='제목'></input>
      </div>
      <div id='contents'>
        <textarea placeholder='내용을 입력하세요'></textarea>
      </div>
    </div>
  );
}
export default Write;
