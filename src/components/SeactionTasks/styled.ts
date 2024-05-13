import styled from "styled-components";
import ScrollContainer from 'react-indiana-drag-scroll';

interface IProps {
    minus: string;
}

interface ITask {
    bg: string;
    cl: string;
}


export const Container = styled(ScrollContainer) <IProps>`
    display: flex;

    padding: 24px;
    max-width: calc(100vw - ${props => props.minus}px);

    color: #828fa3;
    font-weight: 600;

    overflow-x: scroll;
    white-space: nowrap;
    
    article {
        min-width: 280px;
        max-width: 280px;

        margin-right: 24px;
    }

    @media (max-width: 900px) {
        max-width: 100%;
    }
`;

export const Info = styled.div<{ clcolumn: string }>`

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    div {
        width: 15px;
        height: 15px;
        margin-right: 12px;

        border-radius: 50%;

        /* background-color: ${props => props.clcolumn}; */
        background-color: #67E2AE;
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
        box-shadow: 3px 3px 5px rgba(130, 143, 163, .1);

        cursor: pointer;
        transition: color .1s ease;

        &:hover {
            color: #635fc7;
        }
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

export const AddTask = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 80px;

    border-radius: 6px;

    background-color: rgba(50, 50, 50, .4);

    button {
        margin-top: 5px;
        padding: 5px 16px;
    }
`;

export const ContainerPopUp = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;

    width: 100%;
    height: 100%;
    padding: 50px 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, .3);
`;

export const ContainerButton = styled.div`
    width: 100%;
    max-width: 480px;

    margin-bottom: 8px;

    display: flex;
    justify-content: end;

    img {
        cursor: pointer;
    }
`;

export const ContainerAddBoard = styled.article`
    width: 100%;
    min-height: 400px;

    border-radius: 6px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: rgba(50, 50, 50, .1);

    cursor: pointer;

    strong {
        font-size: 24px;
        color: #828fa3;

        transition: color .12s ease;
    }

    &:hover {
        strong {
            color: #635fc7;
        }
    }
`;