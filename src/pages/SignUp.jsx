import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSignUp from '../hooks/useSignUp';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import Button from "../shared/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUpHandler, isLoading } = useSignUp();
  const isLoggedIn = useAuth();
  const [newUser, setNewUser] = useState({ id: '', password: '' });

  if (isLoggedIn) {
    alert('이미 로그인 하셨습니다.');
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, password } = newUser;
    if (!id || !password) {
      alert('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    signUpHandler(newUser);
    setNewUser({ id: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>회원가입</h1>

      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>아이디</StyledLabel>
        <StyledInput type="text" name='id' value={newUser.id} onChange={handleChange} required />

        <StyledLabel>비밀번호</StyledLabel>
        <StyledInput type="password" name='password' value={newUser.password} onChange={handleChange} required />

        <Buttons>
          <Button type='submit' disabled={isLoading}>회원가입</Button>
          <Button
            type="button"
            onClick={() => {
              navigate("/login");
            }}>로그인하기</Button>
        </Buttons>
      </StyledForm>
    </Container>
  );
};

export default SignUp;


const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid gray;
  height: 30px;
  margin-bottom: 10px;
`

const StyledLabel = styled.label`
  text-align: left;
`

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;

  Button {
    flex: 1;
  }
  Button:first-child {
    margin-right: 10px;
  }
`
