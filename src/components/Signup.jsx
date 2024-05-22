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
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const navigate = useNavigate();


  const validateName = () => {
    if (!name) {
      setNameError("이름을 입력해주세요.");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    if (!email || !email.includes("@")) {
      setEmailError("올바른 이메일을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const validateAge = () => {
    if (isNaN(age) ) {
      setAgeError("나이를 올바르게 입력해주세요.");
    } else if(age<0){
      setAgeError("나이는 음수가 될 수 없습니다.");
    } else if(age%1 !==0) {
      setAgeError("나이는 소수가 될 수 없습니다.")
    } else if(age<19){
      setAgeError("우리 영화 사이트는 19살 이상만 가입이 가능합니다.") 
    } else {
      setAgeError()
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const validatePassword2 = () => {
    if (password !== password2) {
      setPassword2Error("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Error("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validateAge();
    validatePassword();
    validatePassword2();

   
    if (!nameError && !emailError && !ageError && !passwordError && !password2Error) {
  
          console.log("회원가입 성공!");
          navigate("/Login"); 

    } else {
      console.log("유효성 검사를 모두 통과해야 합니다.");
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
            setNameError(""); 
          }}
          onBlur={validateName}
        />
        <ErrorMsg>{nameError}</ErrorMsg>
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); 
          }}
          onBlur={validateEmail}
        />
        <ErrorMsg>{emailError}</ErrorMsg>
        <Input
          type="number"
          name="age"
          placeholder="나이를 입력해주세요"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setAgeError(""); 
          }}
          onBlur={validateAge}
        />
        <ErrorMsg>{ageError}</ErrorMsg>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(""); 
          }}
          onBlur={validatePassword}
        />
        <ErrorMsg>{passwordError}</ErrorMsg>
        <Input
          type="password"
          name="password2"
          placeholder="비밀번호를 다시 입력해주세요"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            setPassword2Error(""); 
                    }}
          onBlur={validatePassword2}
        />
        <ErrorMsg>{password2Error}</ErrorMsg>
        <Button type="submit" onClick={handleSubmit}>
          제출하기
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;