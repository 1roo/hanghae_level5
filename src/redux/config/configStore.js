import { configureStore } from "@reduxjs/toolkit";
import arithmeticQuiz from "../modules/arithmeticQuiz";


const store = configureStore({
    reducer: {
        quiz: arithmeticQuiz,
    }
})

export default store;