import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowCircleRight } from "react-icons/fa";
import { checkAuth } from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    checkAuth().then(isLoggedIn => {
      if (!isLoggedIn) {
        alert('홈 로그인은 필수입니다.');
        navigate("/login");
      }
    });
  }, [navigate]);



  return (
    <>
      <div>
        <div>
          <h1>무엇을 할까요?</h1>
          <StyledDiv
            onClick={() => {
              navigate("/quiz");
            }}
          >문제 풀기<FaArrowCircleRight size={24} color="#191970" /></StyledDiv>
          <StyledDiv
            onClick={() => {
              navigate("/wrongAnswers");
            }}
          >오답노트<FaArrowCircleRight size={24} color="#191970" /></StyledDiv>
        </div>
      </div>

    </>
  );
}

export default Home;

const StyledDiv = styled.div`
  width: 80%;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 auto 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  cursor: pointer;

`