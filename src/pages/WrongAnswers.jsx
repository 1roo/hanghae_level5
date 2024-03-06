import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const WrongAnswers = () => {
    const { wrongAnswers } = useSelector(state => state.quiz);
    console.log(wrongAnswers);


    return (
        <div>
            <h1>틀린 문제 목록</h1>
            {wrongAnswers && wrongAnswers.length > 0 && (
                    <div>
                        {wrongAnswers.map((wrongAnswer, index) => (
                            <div key={index}>
                                <p>{wrongAnswer.num1} {wrongAnswer.operator} {wrongAnswer.num2} = {wrongAnswer.userAnswer} (정답: {wrongAnswer.correctAnswer})</p>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default WrongAnswers;