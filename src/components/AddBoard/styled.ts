import styled from "styled-components";

interface IProps {
    bg: string;
    cl: string;
}

export const ContentAdd = styled.form<IProps>`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;

    background-color: ${props => props.bg};

    box-shadow: 0 0 15px rgba(50, 50, 50, .2);

    strong {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;

        color: ${props => props.cl};
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input {
        background-color: transparent;

        padding: 8px 16px;
        border: 1px solid #a2a2a2;
        border-radius: 4px;

        outline: 0;

        color: ${props => props.cl};

        margin-bottom: 20px;

    }

    span {
        font-size: .8rem;
        font-weight: 700;
        color: #828FA3;

        margin-bottom: 5px;

    }


    li {
        font-size: 13px;
        font-weight: 500;

        display: flex;
        flex-direction: row;
        align-items: center;

        margin-bottom: 12px;

        div {
            width: 100%;
        }

        img {
            padding:  6px 15px;

            cursor: pointer;
        }
    }

    button {
        padding: 9px;

        border: none;
        border-radius: 20px;

        font-weight: 700;

    }


    @media (max-width: 470px) {
        padding: 24px;
    }
`;

export const ButtonColumn = styled.button`
    background-color: rgba(99, 95, 199, .1);
    color: #635FC7;
`;

export const Button = styled.button`

    background-color: #635FC7;
    color: white;

    transition: opacity .1s ease;

    &:hover {
        opacity: .8;
    }
`;
