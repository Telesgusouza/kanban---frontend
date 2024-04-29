import styled from "styled-components";

interface IProps {
    bg: string;
    cl: string;
}

export const Container = styled.form<IProps>`
    display: grid;
    grid-column: 1fr;
    grid-gap: 24px;

    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;
    
    color: ${props => props.cl};

    background-color: ${props => props.bg};

    h3 {
        font-size: 1.12rem;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input {
        background-color: transparent;
    }
`;