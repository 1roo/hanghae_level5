import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSignUp from '../hooks/useSignUp';
import styled from 'styled-components';
import Cookies from "universal-cookie";

const SignUp = () => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const { user, changeHandler, signUpHandler } = useSignUp();


    useEffect(() => {
        const token = cookie.get("accessToken");
        if (token) {
            window.alert('이미 로그인 상태입니다.')
            navigate("/");
        }
    }, [navigate]);
    return (
        <Container>
            <h1>회원가입</h1>

            <StyledForm onSubmit={(e) => signUpHandler(e, user)}>
                <StyledLabel>아이디</StyledLabel>
                <StyledInput type="text"
                    name='id'
                    value={user.id}
                    onChange={changeHandler} />

                <StyledLabel>비밀번호</StyledLabel>
                <StyledInput type="password"
                    name='password'
                    value={user.password}
                    onChange={changeHandler} />
                <Buttons>
                    <Button>회원가입</Button>
                    <Button
                        type="button"
                        onClick={() => {
                            navigate("/login");
                        }}>로그인하기</Button>
                </Buttons>
            </StyledForm>
        </Container>
    )
}

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

const Button = styled.button`
  border: 1px solid #191970;
  height: 30px;
  border-radius: 5px;
  background-color: #191970;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #19197021;
    color: #191970;
    font-weight: 600;
  }
`