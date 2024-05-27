import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  height: 100vh;
  width:100vw;
  background-color: navy;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForgetId = styled.p`
  font-weight:bold;
  display:inline;
  font-size:13px;
  margin-left:50px;
`;

const P = styled.p `
  display:inline-block;
  font-size:13px; 
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const Form = styled.form`
  width: 50%;
  color: white;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: yellow;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          username,
          password,
          passwordCheck,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("회원가입 성공!", data);
        alert("회원가입이 정상적으로 처리되었습니다!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입 페이지</Title>
        <Input
          type="text"
          name="name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(""); 
          }}
        />
        <ErrorMsg>{error}</ErrorMsg>
        <Input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(""); 
          }}
        />
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); 
          }}
        />
        <Input
          type="number"
          name="age"
          placeholder="나이를 입력해주세요"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setError(""); 
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); 
          }}
        />
        <Input
          type="password"
          name="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            setError(""); 
          }}
        />
        <Button type="submit">
          제출하기
        </Button>
        <P>이미 아이디가 있으신가요?</P>
        <ForgetId onClick={() => navigate('/login')}>로그인 페이지로 이동하기</ForgetId>
      </Form>
    </Container>
  );
};

export default Signup;