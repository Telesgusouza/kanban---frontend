import styled from "styled-components";

interface IProps {
    bg?: string;
    cl?: string;
    clspan?: string;
}

export const Container = styled.form<IProps>`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 480px;

    background-color: ${props => props.bg};
    
    padding: 25px;
    border-radius: 6px;

    strong {
        font-size: 18px;
        color: ${props => props.cl};

        margin-bottom: 23px;
    }

    input  {
        background-color: transparent;
        border: 1px solid rgba(130, 143, 163, .25);

        color: ${props => props.cl};
    }

    span {
        color: ${props => props.clspan};
        font-size: 12px;
        margin-bottom: 6px;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input {
        margin-bottom: 24px;
    }

    ul {
        display: grid;
        grid-gap: 12px;
        margin-bottom: 12px;
    }

    li {
        width: 100%;
        
        display: flex;
        flex-direction: row;

        align-items: center;

        div {
            width: 100%;

            border: 1px solid rgba(130, 143, 163, .25);
        }

        img {
            padding: 4px 15px;
            cursor: pointer;
        }
    }


`;
