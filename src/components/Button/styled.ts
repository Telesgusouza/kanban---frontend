import styled from "styled-components";

interface IProps {
    mg: number;
    
    light: string;
    del: string;
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

    ${props => props.del}

    ${ props => props.light }

  

`;