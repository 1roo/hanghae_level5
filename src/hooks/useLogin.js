import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import api from "../axios/api";
import { jwtDecode } from "jwt-decode";



const useLogin = () => {

    const cookie = new Cookies();

    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);


    const loginHandler = async (e, user) => {
        e.preventDefault();

        const isIdEmpty = user.id === "";
        const isPwEmpty = user.password === "";


        if (!isIdEmpty && !isPwEmpty) {
            setIsLoading(true);
            try {
                const { data } = await api.post("/login", user);
    
                cookie.set("accessToken", data.token, { path: "/", maxAge: 600 });
                cookie.set("id", jwtDecode(data.token).id, { path: "/", maxAge: 600 });
                navigate("/");
                console.log('useLogin,login성공');
            } catch (error) {
                setIsError(true);
                setError(error.response.data.message);
                window.alert(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            window.alert('아이디와 비밀번호를 모두 입력하세요.')
        }

    }


    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }))
    }

    return {
        user, loginHandler, changeHandler, isLoading,
    }

}

export default useLogin;