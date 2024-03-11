import React from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import Cookies from "universal-cookie";

const Button = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        const cookie = new Cookies();
        const accessToken = cookie.get('accessToken');
        

        // 만료되었는지 확인
        if (!accessToken || isTokenExpired(accessToken)) {
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            navigate('/login');
        } else {
            // 버튼이 클릭되었을 때의 기본 동작 수행
            if (props.onClick) {
                props.onClick();
            }
        }
    };


    return (
        <StyledButton {...props} disabled={props.disabled}>
            {props.children}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
  align-items: center;
  justify-content: center;
  border: 1px solid #191970;
  background-color: #191970;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #19197021;
    color: #191970;
    font-weight: 600;
  }

  ${({ size }) => {
        switch (size) {
            case "large":
                return css`
          width: 395px;
        `;
            case "medium":
                return css`
          width: 80px;
        `;
            case "small":
                return css`
          width: 70px;
          height: 30px;
        `;
            default:
                return css`
          width: 120px;
        `;
        }
    }}
`;

const isTokenExpired = (accessToken) => {
    if (!accessToken) {
        window.alert('다시 로그인해주세요.')
        return true;
    }

    try {
        // 토큰을 디코딩하여 payload 가져오기
        const payload = JSON.parse(atob(accessToken.split('.')[1]));

        // 토큰의 만료 시간 가져오기
        const expirationTime = payload.exp * 1000; // 밀리초 단위로 변환

        // 현재 시간과 비교하여 토큰의 만료 여부 확인
        return Date.now() >= expirationTime;
    } catch (error) {
        console.error('토큰 디코딩 중 오류 발생:', error);
        // 오류 발생 시 만료되었다고 처리
        return true;
    }
};