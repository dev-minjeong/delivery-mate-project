import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';

const Test = (props) => {
  const data = useParams();
  console.log(data);
  return (
    <div>
      <h3>user name : {data.name}</h3>
      <h3>user age : {data.age}</h3>
    </div>
  );
};
export default Test;
