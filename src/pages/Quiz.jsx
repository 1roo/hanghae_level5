import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomNumbers, randomOperator, setUserAnswer, checkAnswer } from '../redux/modules/quizSlice'
import { useNavigate } from 'react-router';
import { checkAuth } from "../hooks/useAuth";
import Button from "../shared/Button";
import styled from 'styled-components';

const Quiz = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { num1, num2, operator, userAnswer, correctAnswer } = useSelector(state => state.quizzes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then(isLoggedIn => {
            if (!isLoggedIn) {
                alert('로그인은 필수입니다.');
                navigate("/login");
            }
        });
    }, [navigate]);

    useEffect(() => {
        makeQuiz();
    }, []);


    const makeQuiz = () => {
        // console.log('퀴즈만들어짐요');
        dispatch(randomNumbers());
        dispatch(randomOperator());
        setIsSubmitted(false);
        setInputValue('');
    }

    const handleSubmit = () => {
        if (!isNaN(inputValue)) {
            dispatch(setUserAnswer(parseInt(inputValue, 10)));
        } else {
            dispatch(setUserAnswer(0));
        }
        setIsSubmitted(true);
        console.log('Submitted - Current State:', { num1, num2, operator, userAnswer, correctAnswer });
    }


const handleToNext = () => {
    if (isSubmitted) {
        setInputValue('');
        makeQuiz();
    } else {
        handleSubmit();
    }
}

useEffect(() => {
    if (isSubmitted) {
        dispatch(checkAnswer());
        console.log('After checkAnswer() - Current State:', { num1, num2, operator, userAnswer, correctAnswer });
    }
}, [isSubmitted, dispatch]);


return (
    <>
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '0px' }}>사칙연산 퀴즈</h1>
            <p style={{ textAlign: 'center', marginTop: '0px' }}>(나누기는 몫만 입력해주세요.)</p>
            <div>
                <StyledP>{num1} {operator} {num2}</StyledP>
                <StyledDiv>
                    <StyledInput
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isSubmitted}
                    />
                    {!isSubmitted && (
                        <Button onClick={handleSubmit}>제출</Button>
                    )}
                </StyledDiv>
                <StyledDiv style={{ marginTop: '10px' }}>
                    {isSubmitted && (
                        <>
                            <p>{userAnswer === correctAnswer ? '정답입니다!' : '틀렸습니다!'}</p>

                            <p>정답: {correctAnswer}</p>
                        </>
                    )}
                </StyledDiv>

                <StyledDiv style={{ marginTop: '10px' }}>
                    <Buttons>
                        <Button onClick={handleToNext}>다음</Button>
                        <Button onClick={() => navigate("/")}>이전으로</Button>
                    </Buttons>
                </StyledDiv>
            </div>
        </div>

    </>
)
}

export default Quiz

const StyledP = styled.p`
  font-size: 20px;
  text-align: center;
`

const StyledInput = styled.input`
  margin-right: 10px;
  height: 30px;
  border: 1px solid;
  border-radius: 5px;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 10px;
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