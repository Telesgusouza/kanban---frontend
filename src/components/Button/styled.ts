import styled, { css } from "styled-components";

interface IProps {
    bglight: string;
    mg: number;
    
    light: boolean;
    del: boolean;
}

export const Button = styled.button<IProps>`
    padding: 9px;    

    border: none;
    border-radius: 20px;

    font-weight: 700;
    
    background-color: #635FC7;
    color: white;

    transition: opacity .1s ease;

    margin-bottom: ${props => props.mg}px;

    &:hover {
        opacity: .8;
    }

    ${ props => props.del && css`

        background-color: #ea5555;
        color: #ffffff;

    `}

    ${ props => props.light && css`

        background-color: ${props.bglight == "light" ? "rgba(99, 95, 199, .10)" : "rgba(255, 255, 255, 1)"};
        color: rgba(99, 95, 199, 1);
        
    `}

`;