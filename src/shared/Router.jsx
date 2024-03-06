import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";

const Router = () => {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;
