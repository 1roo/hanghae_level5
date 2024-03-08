import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomNumbers, randomOperator, setUserAnswer, checkAnswer } from '../redux/modules/quizSlice'
import { useNavigate } from 'react-router';
import { checkAuth } from "../hooks/useAuth";

const Quiz = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { num1, num2, operator, userAnswer, correctAnswer } = useSelector(state => state.quiz);
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
        console.log('퀴즈만들어짐요');
        dispatch(randomNumbers(num1, num2));
        dispatch(randomOperator(operator));
        setIsSubmitted(false);
        setInputValue('');
    }

    const handleSubmit = () => {
        dispatch(setUserAnswer(+inputValue));
        dispatch(checkAnswer());
        setIsSubmitted(true);
        setInputValue('');
    }

    const handleToNext = () => {
        if (!isSubmitted) {
            dispatch(setUserAnswer(''));
            dispatch(checkAnswer());
            setInputValue('');
        }
        makeQuiz();
    }



    return (
        <>
            <div>
                <h1>사칙연산 퀴즈</h1>
                <div>
                    <p>{num1} {operator} {num2}</p>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isSubmitted}
                    />
                    {isSubmitted && (
                        <p>{userAnswer === correctAnswer ? '정답입니다!' : '틀렸습니다!'}</p>
                    )}
                    {!isSubmitted ? (
                        <button onClick={handleSubmit}>제출</button>
                    ) : (
                        <>
                            <p>정답: {correctAnswer}</p>
                            <button onClick={handleToNext}>다음</button>
                        </>
                    )}
                    <button onClick={() => {
                        navigate("/");
                    }}>이전으로</button>
                </div>


            </div>

        </>
    )
}

export default Quiz