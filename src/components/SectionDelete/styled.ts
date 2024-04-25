import styled from "styled-components";

interface IProps {
    bg: string;
}

export const Container = styled.form<IProps>`
    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;

    display: flex;
    flex-direction: column;
    
    background-color: ${props => props.bg};

    div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
    }

    strong {
        font-size: 18px;
        font-size: 1.125rem;
        font-weight: 700;

        margin-bottom: 24px;

        color: #ea5555;
    }

    p {
        font-size: 13px;
        color: #828fa3;
        margin-bottom: 24px;
    }
`;
