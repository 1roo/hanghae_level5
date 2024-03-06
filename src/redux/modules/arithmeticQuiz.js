import { createSlice } from '@reduxjs/toolkit';

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
        updatedState = {
          ...updatedState,
          wrongAnswers: [
            ...state.wrongAnswers,
            {
              num1: state.num1,
              operator: state.operator,
              num2: state.num2,
              userAnswer: state.userAnswer,
              correctAnswer: answer
            }
          ]
        }
      }
      console.log('updatedState: ', updatedState);
      return updatedState;
    },
  },
});

export const { randomNumbers, randomOperator, setUserAnswer, checkAnswer } = quizSlice.actions;
export default quizSlice.reducer;