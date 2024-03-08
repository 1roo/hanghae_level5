import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { IoIosHome } from "react-icons/io";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const cookie = new Cookies();
    const navigate = useNavigate();


    const handleLogout = () => {
        cookie.remove("accessToken");
        cookie.remove("id");
        window.alert('로그아웃 완료');
        navigate("/login");
    };


    return (
        <Container>
            <StyledHeader>
                <IoIosHome size={24} style={{ cursor: 'pointer' }} onClick={() => { navigate("/") }} />
                {cookie.get("accessToken") && (
                    <StyledSpan onClick={() => { handleLogout(); }}>
                        로그아웃</StyledSpan>
                )}
            </StyledHeader>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
`

const StyledSpan = styled.span`
    cursor: pointer;
`