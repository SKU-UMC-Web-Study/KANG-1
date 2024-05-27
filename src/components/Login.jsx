import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: navy;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const Title = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 30%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 30%;
  padding: 10px;
  background-color: white;
  margin-top: 20px;
  color: black;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: yellow;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  margin-right: 100px;
`;

const Login = ({ onLogin }) => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [IdError, setIdError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateId = () => {
    if (!Id) {
      setIdError("아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
  };

  const validatePassword = () => {
    if (!Password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Id,
          password: Password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("로그인에 성공했습니다!");
        setLoading(false);
        onLogin();
        navigate("/");
      } else {
        const data = await response.json();
        setIdError(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>로그인 페이지</Title>
      <Input
        type="text"
        name="Id"
        placeholder="아이디"
        value={Id}
        onChange={(e) => {
          setId(e.target.value);
          setIdError("");
        }}
        onBlur={validateId}
      />
      <ErrorMsg>{IdError}</ErrorMsg>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={Password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
        }}
        onBlur={validatePassword}
      />
      <ErrorMsg>{PasswordError}</ErrorMsg>
      <Button type="submit" onClick={handleLogin} disabled={loading}>
        {loading ? "로딩 중..." : "로그인"}
      </Button>
    </Container>
  );
};

export default Login;