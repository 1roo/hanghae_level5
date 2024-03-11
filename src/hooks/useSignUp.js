import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios/api';

const useSignUp = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        id: "",
        password: "",
    })


    


    const signUpHandler = async (e, user) => {
        e.preventDefault();
        
        const isIdEmpty = user.id === "";
        const isPwEmpty = user.password === "";

        if (!isIdEmpty && !isPwEmpty) {
            setIsLoading(true);

            try {
                await api.post("/register", user);
                window.alert('회원가입에 성공하였습니다.');
                navigate("/login");
            } catch (error) {
                setIsError(true);
                setError(error.response.data.message);
                window.alert(error.response.data.message);
            } finally {
                setIsLoading(false);
            }

        } else {
            window.alert('아이디와 비밀번호를 모두 입력하세요.');
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }))
    }



    return { user, isLoading, signUpHandler, changeHandler, }
}

export default useSignUp