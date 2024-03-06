import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { FaArrowCircleRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("accessToken");

  useEffect(() => {
    if (!token) {
      window.alert('로그인부터 하세요~!');
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <div>
        <div>
          <h1>무엇을 할까요?</h1>
          <StyledDiv
            onClick={() => { }}
          >할 일 기록하기<FaArrowCircleRight size={24} color="#191970"/></StyledDiv>
          <StyledDiv
            onClick={() => { }}
          >TODO LIST<FaArrowCircleRight size={24} color="#191970"/></StyledDiv>
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