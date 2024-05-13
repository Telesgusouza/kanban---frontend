import styled from "styled-components";

interface IProps {
    visiblemn: string;
    bg: string;
}

export const Dropdown = styled.div<IProps>`
    margin-top: 40px;

    position: relative;
    
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 8px 16px;
        margin-top: 8px;

        border-radius: 6px;
        border: 1px solid #3e3f4e;

        cursor: pointer;

        &:hover {
            border: 1px solid #635fc7;
        }
    }

    ul {
        position: absolute;
        top: 100%;

        z-index: 999;

        display: ${props => props.visiblemn};
        grid-template-columns: 1fr;
        grid-gap: 18px;

        width: 100%;
        max-height: 100px;
        border-radius: 8px;

        overflow-y: scroll;

        padding: 16px;

        font-size: 13px;
        color: #828fa3;

        background-color: ${props => props.bg};
        box-shadow: 0 0 5px rgba(130, 143, 163, .1);

        li {
            cursor: pointer;
        }

    }


`;
