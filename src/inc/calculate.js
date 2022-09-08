import { useState } from 'react';

const Calculate = ({ writerPay, writerName, userName, joinNum }) => {
  const [totalCost, setTotalCost] = useState(0);
  const deliveryCost = Math.floor(writerPay / (joinNum + 1));
  const calcCost = () => {
    const foodCost = Number(
      document.getElementsByName('food-cost')[0].value.trim()
    );
    const costCalc = foodCost + deliveryCost;
    setTotalCost(costCalc);
  };
  return (
    <>
      <h4>
        {userName}님이 송금하실 총 금액 : {totalCost ? `${totalCost}원` : null}
      </h4>
      <div className='calc-cost'>
        <div className='delivery-cost'>
          <p className='delivery-cost-name'>배달비 :</p>
          {!writerPay ? (
            <h5>{writerName}님이 배달비 전액 지불 설정하였습니다</h5>
          ) : (
            <p id='delivery-input'>
              {writerPay}원 / {joinNum + 1}명 = {deliveryCost}원
            </p>
          )}
        </div>
        <div className='food'>
          <p className='food-cost-name'>음식비 : </p>
          <input type='number' name='food-cost' />원
        </div>
      </div>
      <div className='submit-cost'>
        <input
          type='button'
          value='계산하기'
          onClick={() => calcCost()}
        ></input>
      </div>
    </>
  );
};
export default Calculate;
