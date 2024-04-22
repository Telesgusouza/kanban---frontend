import styled from "styled-components";

interface Props {
    cl?: boolean;
}

export const Container = styled.section`
    min-width: 100vw;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #e4ebfa;

    padding: 5px;

    article {
        background-color: #f4f7fd;
        padding: 24px;
        box-shadow: 0 0 15px rgba(228, 235, 250, .5);

        border-radius: 5px;

        margin: 5px;
    }

    h1 {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 25px;
    }


    button {
        width: 100%;

        padding: 7px 25px;
        margin-bottom: 30px;

        font-size: .85rem;
        font-weight: 600;
        color: white;

        border: none;

        background-color: #635fc7;
    }

    p {
        font-size: .95rem;
        color: #3e3f4e;

        text-align: center;
    }

    span {
        cursor: pointer;
    }

`;

export const Label = styled.label<Props>`

        display: flex;
        flex-direction: column;

        color: ${props => props.cl ? "#EA5555" : "#828FA3"};
        font-size: .9rem;

    input {
        width: 100%;

        padding: 8px 16px;
        margin-bottom: 18px;
        margin-top: 4px;

        outline: none;
        border: 1px solid ${props => props.cl ? "#EA5555" : "#828FA3"};
        border-radius: 4px;

    }
`;


export const Password = styled.div`
    position: relative;

    img {
        position: absolute;
        top: 14px;
        right: 12px;

        width: 24px;
        height: 18px;

        cursor: pointer;
    }

    input {
        padding-right: 40px;
    }
`;
