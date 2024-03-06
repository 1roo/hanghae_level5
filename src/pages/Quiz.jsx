import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomNumbers, randomOperator, setUserAnswer, checkAnswer } from '../redux/modules/arithmeticQuiz'
import { useNavigate } from 'react-router';

const Quiz = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { num1, num2, operator, userAnswer, correctAnswer } = useSelector(state => state.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const makeQuiz = () => {
        console.log('퀴즈만들어짐요');
        dispatch(randomNumbers());
        dispatch(randomOperator());
        setIsSubmitted(false);
    }

    useEffect(() => {
        makeQuiz();
    },[]);


    const handleSubmit = () => {
        if (userAnswer === '') {
            dispatch(setUserAnswer(''));
        }
        dispatch(setUserAnswer(+userAnswer));
        dispatch(checkAnswer());
        setIsSubmitted(true);
    }

    const handleToNext = () => {
        if (!isSubmitted) {
            dispatch(setUserAnswer(''));
            dispatch(checkAnswer());
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
                        value={userAnswer}
                        onChange={(e) => dispatch(setUserAnswer(e.target.value))}
                        disabled={isSubmitted} // 답 제출 후에는 입력 비활성화
                    />
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
                {isSubmitted && (
                    <p>{userAnswer === correctAnswer ? '정답입니다!' : '틀렸습니다!'}</p>
                )}
                
            </div>

        </>
    )
}

export default Quiz