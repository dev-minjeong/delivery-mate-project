import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Ckeditor } from './../inc/index.js';
import styled from 'styled-components';
import { LogoImg } from '../img/index.js';

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 35px 60px;
  position: sticky;
  top: 135px;
  .write-title {
    margin: 0 3px;
    display: flex;

    h2 {
    }
    img {
      width: 30px;
      height: 30px;
      margin: 4px 10px;
    }
  }
  input {
    background-color: inherit;
    padding: 10px;
    width: 90%;
    font-size: 22px;
    border-bottom: solid 1px #ababab;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }
  #title {
    margin-top: 20px;
  }
  #contents {
    width: 90%;
    resize: none;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
  }
  .ck-content {
    height: 30vh;
  }
`;

function Write({
  getContents,
  getTitles,
  contents,
  title,
  getModifyData,
  setPageMain,
  setPageLeft,
}) {
  const params = useParams();
  useEffect(() => {
    setPageMain(false);
    setPageLeft(false);
    if (params.data && title.length === 0) {
      getModifyData(params.data);
    }
  }, []);
  return (
    <WriteBox>
      <div className='write-title'>
        <img src={LogoImg} alt='logo-img' className='logo-img'></img>
        <h2>Post</h2>
      </div>

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
    </WriteBox>
  );
}
export default Write;
