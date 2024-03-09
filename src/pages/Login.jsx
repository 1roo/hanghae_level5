import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import Button from "../shared/Button";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginHandler, changeHandler } = useLogin();
  const isLoggedIn = useAuth();

    if (isLoggedIn) {
      alert('이미 로그인 하셨습니다.');
      navigate('/');
      return null;
    }

  

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>로그인</h1>

      <StyledForm onSubmit={(e) => loginHandler(e, user)}>
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
          <Button size = 'large' type="submit">로그인</Button>
          <Button size = 'large'
            type="button"
            onClick={() => {
              navigate("/signUp");
            }}>회원가입</Button>
        </Buttons>
      </StyledForm>

    </Container>
  )
};

export default Login;


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
  width: 800px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-content: space-between

  

  Button {
    flex: 1;
  }
  Button:first-child {
    margin-right: 10px;
  }
`

