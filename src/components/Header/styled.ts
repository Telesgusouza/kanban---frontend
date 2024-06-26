import styled from "styled-components";

interface IProps {
    bg: string;
    cl: string;
}

interface ICRight {
    opbutton: string;
}

export const Container = styled.header<IProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 20px;

    background-color: ${props => props.bg};

    h2 {
        font-size: 24px;
        color: ${props => props.cl};
    }


`;

export const ContainerRight = styled.div<ICRight>`
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
        padding: 12px 20px;
        border: 30px;

        font-size: 13px;

        opacity: ${props => props.opbutton};
    }

    div {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 3px;

        margin-left: 24px;

        cursor: pointer;
    }

    span {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #828fa3;
    }
`;
