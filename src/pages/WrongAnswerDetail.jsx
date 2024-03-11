import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAnswer } from '../redux/modules/quizSlice'
import { checkAuth } from "../hooks/useAuth";
import Comments from '../components/Comments';
import Button from "../shared/Button";
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import api2 from '../axios/api2';

const WrongAnswerDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizId } = useParams();
    const wrongAnswers = useSelector(state => state.quizzes.wrongAnswers);
    const wrongAnswer = wrongAnswers.find(wrongAnswer => parseInt(wrongAnswer.quizId) === parseInt(quizId));
    const queryClient = useQueryClient();
    // console.log('quizIDPARAM: ', quizId);
    // console.log('wrongAnswer: ', wrongAnswer);

    useEffect(() => {
        checkAuth().then(isLoggedIn => {
            if (!isLoggedIn) {
                alert('로그인은 필수입니다.');
                navigate("/login");
            }
        });
    }, [navigate]);

    // const handleDeleteAnswer = async (quizId) => {
    //     await dispatch(deleteAnswer(quizId));
    //     navigate('/wrongAnswers');
    // };

    //quiz삭제
    const deleteQuizMutation = useMutation((quizId) => api2.delete(`/wrongAnswers/${quizId}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", quizId]);
        },
    });

    const deleteQuiz = async (quizId) => {
        try {
            await deleteQuizMutation.mutateAsync(quizId);
            navigate('/wrongAnswers');
        } catch (error) {
            console.error("퀴즈삭제에 실패했습니다.");
        }
    };


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>틀린 문제 상세 정보</h1>
            {wrongAnswer && (
                <div>
                    <StyledDiv>
                        <StyledSpan>{wrongAnswer.num1} {wrongAnswer.operator} {wrongAnswer.num2} = ? (입력한 답: {wrongAnswer.userAnswer})</StyledSpan>
                        <Buttons>
                            <Button size='small'
                                value={wrongAnswer.quizId}
                                onClick={() => deleteQuiz(wrongAnswer.quizId)}>삭제</Button>
                            <Button size='small'
                                onClick={() => {
                                    navigate('/wrongAnswers')
                                }}>이전으로</Button>
                        </Buttons>
                    </StyledDiv>
                    <h2 style={{ textAlign: 'center' }}>댓글</h2>
                    <Comments quizId={wrongAnswer.quizId} />
                </div>
            )}
            {!wrongAnswer && <p>틀린 문제를 찾을 수 없습니다.</p>}
        </div>
    );
};

export default WrongAnswerDetail;

const StyledSpan = styled.span`
  margin: 10px 0;
  font-size: 1.2em;
  cursor: pointer;
  font-weight: 500;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Buttons = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;

  Button {
    margin-right: 5px;
  }

`
