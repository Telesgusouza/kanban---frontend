import styled from "styled-components";

interface IProps {
    bg: string;
    cl: string;
    clspan: string;
}

export const ContainerCard = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const Container = styled.form<IProps>`
    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;

    color: ${props => props.cl};
    background-color: ${props => props.bg};

    strong {
        font-size: 18px;
        font-weight: 600;

        white-space: break-spaces;
    }

    span {
        font-size: .8rem;
        color: ${props => props.clspan};
    }

    ul {
        margin-top: 14px;

        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 8px;
    }

`;

export const Description = styled.p`
    margin-bottom: 24px;

    font-size: 13px;
    color: #828fa3;

    line-height: 150%;

    white-space: break-spaces;

`;

export const ThreeDots = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 3px;

    height: fit-content;
    padding-left: 10px;
    margin-top: 5px;

    cursor: pointer;

    div {
        width: 3px;
        height: 3px;

        border-radius: 50%;

        background-color: gray;
    }
`;

export const ContainerHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 24px;
`;
