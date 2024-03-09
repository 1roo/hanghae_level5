import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import Quiz from "../pages/Quiz";
import WrongAnswers from "../pages/WrongAnswers";
import WrongAnswerDetail from "../pages/WrongAnswerDetail";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/wrongAnswers' element={<WrongAnswers />} />
                <Route path="/wrongAnswers/:quizId" element={<WrongAnswerDetail />} />

            </Routes>
        </BrowserRouter>
    )
};

export default Router;
