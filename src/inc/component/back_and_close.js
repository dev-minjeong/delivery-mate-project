import { IoArrowBack, IoClose } from 'react-icons/io5';
import styled from 'styled-components';

function BackAndClose(props) {
  const controller = (target, type) => {
    if (target === 'id') {
      props.resetIdResult();
    } else if (target === 'pw') {
      props.resetPwResult();
    }
    if (type === 'back') {
      props.backSearchModal(target);
    } else if (type === 'close') {
      props.closeSearchModal(target);
    }
  };
  return (
    <BackCloseBox>
      <div id='back-btn'>
        <IoArrowBack
          onClick={() => controller(props.target, 'back')}
        ></IoArrowBack>
      </div>
      <div id='close-btn'>
        <IoClose onClick={() => controller(props.target, 'close')}></IoClose>
      </div>
    </BackCloseBox>
  );
}

const BackCloseBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 25px 0 25px;
  div {
    font-size: 24px;
  }
`;

export default BackAndClose;
