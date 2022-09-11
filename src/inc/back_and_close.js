
import { IoArrowBack, IoClose } from 'react-icons/io5';
import styled from 'styled-components';

const BackCloseBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 25px 0 25px;
  font-size: 24px;
`;

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
export default BackAndClose;
