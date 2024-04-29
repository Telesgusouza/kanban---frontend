import styled from "styled-components";
import ScrollContainer from 'react-indiana-drag-scroll';

interface IProps {
    minus: string
}

interface ITask {
    bg: string;
    cl: string;
}


export const Container = styled(ScrollContainer)<IProps>`
    display: flex;

    padding: 24px;
    max-width: calc(100vw - ${props=>props.minus}px);


    color: white;

    overflow-x: scroll;
    white-space: nowrap;
    
    article {
        min-width: 280px;
        max-width: 280px;

        margin-right: 24px;
    }

    ul {

    }

`;

export const Info = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    div {
        width: 15px;
        height: 15px;
        margin-right: 12px;

        border-radius: 50%;

        background-color: red;
    }
`;

export const TaskList = styled.ul<ITask>`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    li {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 8px;

        padding: 16px;

        border-radius: 8px;
        color: ${props => props.cl};

        background-color: ${props => props.bg};
        box-shadow: 0 0 5px rgba(130, 143, 163, .1);
    }

    strong {
        font-size: .94rem;
    }

    span {
        font-size: 12px;
        font-size: 12px;
        font-weight: 700;
        color: #828fa3;
    }

`;