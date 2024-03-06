
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import api from "../axios/api";



const useAuth = () => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const token = cookie.get("accessToken");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAuth = async () => {
        try {
            await api.get("/user", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (token !== undefined || token !== null) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            if (error.response.status === 401) {
                cookie.remove("accessToken");
                cookie.remove("id");
                window.alert('로그인부터 하세요');
                navigate('/login');
            }
        }
    } 
    
    return isLoggedIn;
}

export default useAuth;