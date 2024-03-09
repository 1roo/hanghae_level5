import React from "react";
import styled, { css } from "styled-components";

const Button = (props) => {
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
