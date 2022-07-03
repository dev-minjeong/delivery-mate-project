import React from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';

function Test() {
  const { data } = useParams();
  return (
    <div>
      <h3>user name : {data}</h3>
    </div>
  );
}
export default Test;
