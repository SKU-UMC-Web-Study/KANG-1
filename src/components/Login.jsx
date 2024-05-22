import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const Container = styled.div`
  height: 100vh;
  width:100vw;
  background-color: navy;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color:white; 
  
  `;

  const Title = styled.div`
    margin-bottom:20px
  `;

  const Input = styled.input`
  width: 30%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;`;
  
  const Button = styled.button`
  width: 30%;
  padding: 10px;
  background-color: white;
  margin-top:20px;
  color: black;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;`;

  return (
    <Container>
      <Title>로그인 페이지</Title>
      <Input
        type="text"
        placeholder="아이디"
       
      />
      <Input
        type="text"
        placeholder="비밀번호"
      />
      <Button type="submit">로그인</Button>
    </Container>
  );
};

export default Login;