
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import api from "../axios/api"

export const checkAuth = async () => {
    const cookie = new Cookies();
    const token = cookie.get("accessToken");

    try {
        if (token) {
            const response = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // console.error("checkAuth 에러: ", error);
        throw error;
    }
};

const useAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const isAuthenticated = await checkAuth();
                setIsLoggedIn(isAuthenticated);
                
            } catch (error) {
                // console.error("useAuth 에러: ", error);
                if (error.response && error.response.status === 401) {
                    const cookie = new Cookies();
                    cookie.remove("accessToken");
                    cookie.remove("id");
                    window.alert("로그인부터 하세요");
                    navigate("/login");
                }
            }
        };

        fetchAuthStatus();
    }, [navigate]);

    return isLoggedIn;

};

export default useAuth;