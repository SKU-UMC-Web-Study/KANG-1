import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: navy;
  width: 100vw;
  color: white;
`;

const ReturnLink = styled(Link)`
  font-size: 18px;
  color: white;
  text-decoration: none; /* 밑줄 제거 */
  cursor: pointer;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>Oops!</h1>
      <p>예상치 못한 에러가 발생했습니다.</p>
      <p>Not Found</p>
      <ReturnLink to="/">메인으로 이동하기</ReturnLink>
    </NotFoundContainer>
  );
};

export default NotFound;