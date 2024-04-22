import styled, { css } from "styled-components";

interface IProps {
    bglight: string;
    light: string;
}

export const Button = styled.button<IProps>`
    padding: 9px;    

    border: none;
    border-radius: 20px;

    font-weight: 700;
    
    background-color: #635FC7;
    color: white;

    transition: opacity .1s ease;

    &:hover {
        opacity: .8;
    }

    ${ props => props.light === "light" && props.bglight === "light" && css`

        background-color: rgba(99, 95, 199, .10);
        color: rgba(99, 95, 199, 1);
        margin-bottom: 24px;
    `}

    ${ props => props.light === "light" && props.bglight === "dark" && css`
        background-color: white;
        color: rgba(99, 95, 199, 1);
        margin-bottom: 24px;
    `}

`;