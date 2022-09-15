import { useState } from 'react';
import Modal from 'react-awesome-modal';
import styled from 'styled-components';

import { IoClose } from 'react-icons/io5';

const CalcBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background-color: white;
  height: 100%;
  width: 100%;
  svg {
    justify-content: flex-end;
  }
  p {
    font-size: 15px;
    font-weight: bold;
  }
  h5 {
    margin-top: 20px;
  }
  .delivery-cost {
    display: flex;
    margin-top: 14px;
    flex-direction: column;
    h5 {
      color: gray;
      margin-top: 0;
    }
    .delivery-calc {
      display: flex;
      p {
        margin-right: 10px;
      }
    }
  }
  .food-cost {
    display: flex;
    margin-top: 20px;
    p {
      margin-right: 10px;
    }
    input {
      background-color: whitesmoke;
    }
  }
  .calc-btn {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input {
      padding: 8px 15px;
      background-color: #bbf294;
      cursor: pointer;
      color: white;
      font-weight: 900;
      border-radius: 15px;
      height: 34px;
    }
  }
`;
const ModalClose = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 20px;
`;

const Calculate = ({
  writerPay,
  writerName,
  userName,
  joinNum,
  calcModal,
  toggleCalcModal,
}) => {
  const [totalCost, setTotalCost] = useState(0);
  const deliveryCost = Math.floor(writerPay / (joinNum + 1));
  const calcCost = () => {
    const foodCost = Number(
      document.getElementsByName('food-cost-input')[0].value.trim()
    );
    if (foodCost) {
      const costCalc = foodCost + deliveryCost;
      setTotalCost(costCalc);
    } else {
      alert('음식값을 입력하세요');
    }
  };
  return (
    <>
      <Modal
        visible={calcModal}
        width='400'
        height='350'
        effect='fadeInDown'
        onClickAway={() => toggleCalcModal(false)}
      >
        <CalcBox>
          <ModalClose>
            <IoClose
              className='close-login-modal'
              onClick={() => toggleCalcModal(false)}
            ></IoClose>
          </ModalClose>
          <div className='delivery-cost'>
            <div className='delivery-calc'>
              <p className='delivery-cost-name'>배달비 : </p>
              {!writerPay ? (
                <div>
                  <p> 0원</p>
                </div>
              ) : (
                <p id='delivery-input'>
                  {writerPay}원 / {joinNum + 1}명 = {deliveryCost}원
                </p>
              )}
            </div>
            {!writerPay ? (
              <h5>{writerName}님이 배달비 전액 지불 설정</h5>
            ) : null}
          </div>
          <div className='food-cost'>
            <p className='food-cost-name'>음식값 : </p>
            <input name='food-cost-input' type='number' />원
          </div>
          <div className='calc-btn'>
            <input
              type='button'
              value='계산하기'
              onClick={() => calcCost()}
            ></input>
          </div>

          {totalCost ? (
            <div>
              <h5>
                {userName}님이 송금하실 총 금액 : {totalCost}원
              </h5>
              <div className='calc-btn'>
                <input
                  type='button'
                  value='송금하기'
                  onClick={() =>
                    window.open('http://kko.to/n-CoNxxne', '_blank')
                  }
                ></input>
              </div>
            </div>
          ) : null}
        </CalcBox>
      </Modal>
    </>
  );
};
export default Calculate;
