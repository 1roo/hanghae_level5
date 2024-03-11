import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkAuth } from "../hooks/useAuth";
import styled from 'styled-components';

const WrongAnswers = () => {
    const wrongAnswers = useSelector(state => state.quizzes.wrongAnswers);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then(isLoggedIn => {
            if (!isLoggedIn) {
                alert('로그인은 필수입니다.');
                navigate("/login");
            }
        });
    }, [navigate]);


    const handleQuizClick = (quizId) => {
        navigate(`/wrongAnswers/${quizId}`);
    };


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>틀린 문제 목록</h1>
            <div>
                {wrongAnswers.map((wrongAnswer) => (
                    <StyledDiv key={wrongAnswer.quizId} onClick={() => handleQuizClick(wrongAnswer.quizId)}>
                        <StyledSpan>{wrongAnswer.num1} {wrongAnswer.operator} {wrongAnswer.num2} = ?</StyledSpan>
                    </StyledDiv>
                ))}
            </div>
        </div>
    );
};

export default WrongAnswers;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const StyledSpan = styled.span`
  margin: 10px 0;
  font-size: 1.2em;
  cursor: pointer;
  &:hover {
    font-size: 1.3em;
    font-weight: 700;
  }
`