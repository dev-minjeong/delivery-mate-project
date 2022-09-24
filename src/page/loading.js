import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingBox>
      <ReactLoading
        type='spin'
        color='#bbf294'
        height={'20px'}
        width={'20px'}
      ></ReactLoading>
      <h3>Loading...</h3>
    </LoadingBox>
  );
};
export default Loading;
