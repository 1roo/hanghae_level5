import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkAuth } from "../hooks/useAuth";

const WrongAnswers = () => {
    const wrongAnswers = useSelector(state => state.quiz.wrongAnswers);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then(isLoggedIn => {
            if (!isLoggedIn) {
                alert('오답노트 로그인은 필수입니다.');
                navigate("/login");
            }
        });
    }, [navigate]);


    const handleQuizClick = (id) => {
        navigate(`/wrongAnswers/${id}`);
    };


    return (
        <div>
            <h1>틀린 문제 목록</h1>
            <div>
                {wrongAnswers.map((wrongAnswer) => (
                    <div key={wrongAnswer.id} onClick={() => handleQuizClick(wrongAnswer.id)}>
                        <p>{wrongAnswer.num1} {wrongAnswer.operator} {wrongAnswer.num2} = ? (정답: {wrongAnswer.correctAnswer})</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WrongAnswers;