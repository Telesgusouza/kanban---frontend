import styled, { css } from "styled-components";

interface iProps {
    done: string;
    op: string;

    bg: string;
    cl: string;
}

interface IChecked {
    check: string;
    bg: string
}

export const Container = styled.div<iProps>`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 12px;
    border-radius: 4px;

    background-color: ${props => props.bg};

    p {
        color: rgba(${props => props.cl}, ${props => props.op});
        text-decoration: ${props => props.done};

        font-size: .75rem;

        white-space: break-spaces;
    }
`;

export const Checkbox = styled.div<IChecked>`
    width: 16px;
    height: 16px;

    margin-right: 16px;
    border-radius: 2px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    ${props => props.check === "check" ? css`
        background-color: #635fc7;

        img {
            display: block;
        }

    ` : css`
        /* background-color: #3e3f4e; // ajustar para o theme */
        background-color: ${props.bg}; // ajustar para o theme
        border: 1px solid #828fa3;

        img {
            display: none;
        }
    ` }

    input {
        width: 100%;
        height: 100%;

        opacity: 0;
        cursor: pointer;
    }

    img {
        position: absolute;
    }

`;
