import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAnswer } from '../redux/modules/quizSlice'
import { checkAuth } from "../hooks/useAuth";

const WrongAnswerDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const wrongAnswers = useSelector(state => state.quiz.wrongAnswers);
    const wrongAnswer = wrongAnswers.find(answer => answer.id === parseInt(id));
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        checkAuth().then(isLoggedIn => {
            if (!isLoggedIn) {
                alert('오답디테일 로그인은 필수입니다.');
                navigate("/login");
            }
        });
    }, [navigate]);


    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        setComments([...comments, comment]);
        setComment('');
    };


    return (
        <div>
            <h1>틀린 문제 상세 정보</h1>
            {wrongAnswer && (
                <div>
                    <p>{wrongAnswer.num1} {wrongAnswer.operator} {wrongAnswer.num2} = ? (입력한 답: {wrongAnswer.userAnswer})</p>
                    <h2>댓글</h2>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea value={comment} onChange={handleCommentChange} placeholder="댓글을 입력하세요" />
                        <button type="submit">댓글 작성</button>
                    </form>
                    <button
                        value={wrongAnswer.id}
                        onClick={(e) => dispatch(deleteAnswer(e.target.value))}>삭제</button>
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <p>{comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!wrongAnswer && <p>틀린 문제를 찾을 수 없습니다.</p>}
        </div>
    );
};

export default WrongAnswerDetail;
