import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizSlice from "../modules/quizSlice";


const rootReducer = combineReducers({
    quizzes: quizSlice,
});


const store = configureStore({
    reducer: rootReducer,
})

export default store;