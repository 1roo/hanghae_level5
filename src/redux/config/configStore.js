import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../modules/quizSlice";


const store = configureStore({
    reducer: {
        quiz: quizSlice,
    }
})

export default store;