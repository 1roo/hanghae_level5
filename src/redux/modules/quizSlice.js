import { createSlice } from '@reduxjs/toolkit';
import api2 from '../../axios/api2';

let nextId = 1;

const initialState = {
  num1: 0,
  num2: 0,
  operator: '+',
  userAnswer: 0,
  correctAnswer: 0,
  wrongAnswers: [],
};

const quizSlice = createSlice({

  name: 'quiz',
  initialState,
  reducers: {
    randomNumbers(state) {
      state.num1 = Math.floor(Math.random() * 100) + 1;
      state.num2 = Math.floor(Math.random() * 100) + 1;
    },
    randomOperator(state) {
      const operators = ['+', '-', '*', '/'];
      state.operator = operators[Math.floor(Math.random() * 4)];
    },
    setUserAnswer(state, action) {
      state.userAnswer = action.payload;
    },
    deleteAnswer(state, action) {
      const deleteId = action.payload;
      const updatedWrongAnswers = state.wrongAnswers.filter(answer => answer.id !== deleteId);
      return {
        ...state,
        wrongAnswers: updatedWrongAnswers,
      };
    },
    checkAnswer(state) {
      let answer;
      switch (state.operator) {
        case '+':
          answer = state.num1 + state.num2;
          break;
        case '-':
          answer = state.num1 - state.num2;
          break;
        case '*':
          answer = state.num1 * state.num2;
          break;
        case '/':
          answer = Math.floor(state.num1 / state.num2);
          break;
        default:
          answer = '';
      }
      let updatedState = {
        ...state,
        correctAnswer: answer,
      }

      if (state.userAnswer !== answer) {
        const newWrongAnswer = {
          id: nextId++,
          num1: state.num1,
          operator: state.operator,
          num2: state.num2,
          userAnswer: state.userAnswer,
          correctAnswer: answer
        };
        updatedState = {
          ...updatedState,
          wrongAnswers: [...state.wrongAnswers, newWrongAnswer]
        };

        api2.post('/wrongAnswers', newWrongAnswer)
          .then(response => console.log('퀴즈 데이터가 성공적으로 전송되었습니다.', response.data))
          .catch(error => console.error('퀴즈 데이터를 JSON 서버에 전송하는 도중 에러가 발생했습니다.', error));
      }
      console.log('updatedState: ', updatedState);
      return updatedState;
    },
  },
});

export const { randomNumbers, randomOperator, setUserAnswer, checkAnswer, deleteAnswer } = quizSlice.actions;
export default quizSlice.reducer;