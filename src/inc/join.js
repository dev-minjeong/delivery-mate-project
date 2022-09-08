import { useState } from 'react';

const Join = ({ userName, writerName, joinNum, joinExist, gsLocation }) => {
  const [noneJoinImg, setNoneJoinImg] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-10.png'
  );
  const [joinImg, setJoinImg] = useState(
    'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-thumb-9.png'
  );

  return (
    <div className='join'>
      {userName !== writerName ? (
        <div>
          <img
            src={!joinExist ? noneJoinImg : joinImg}
            alt='nonejoin'
            onClick={() => gsLocation()}
          ></img>
          <h5>{joinExist ? '참여중' : '참여하기'}</h5>
        </div>
      ) : null}
      <h5>(메이트: {joinNum}명)</h5>
    </div>
  );
};
export default Join;
