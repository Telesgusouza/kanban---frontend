import styled from "styled-components";

interface IProps {
    bg: string;
    cl: string;
}

interface IDropDown {
    visiblemn: string;
}

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    width: 100%;
    min-height: 100%;
    
    padding: 18px 10px 40px 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .7);

`;

export const ContainerButton = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: end;

    width: 100%;
    max-width: 480px;

    margin-bottom: 14px;

    img {
        width: 15px;

        cursor: pointer;
    }
`;

export const ContainerContent = styled.form<IProps>`
    position: relative;
    z-index: 9999;

    display: grid;
    grid-column: 1fr;
    grid-gap: 24px;

    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;
    
    color: ${props => props.cl};

    background-color: ${props => props.bg};

    h3 {
        font-size: 1.12rem;
    }

    label {
        display: flex;
        flex-direction: column;

        font-size: 12px;
        font-weight: 700;
        color: ${props => props.cl};
    }

    input, textarea {
        border: 1px solid #3e3f4e;
        padding: 10px 16px;
        margin-top: 8px;

        font-size: 13px;
        color: ${props => props.cl};

        background-color: transparent;
        border-radius: 4px;

        outline: none;

        position: relative;
        z-index: 9999;

        &::placeholder {
            color: ${props => props.cl};
        }
    }

    textarea {
        resize: none;
    }

    ul {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 12px;

        margin-top: 8px;
        margin-bottom: 12px;
    }

    li {

        display: flex;
        flex-direction: row;
        align-items: center;

        div {
            width: 100%;
        }

        img {
            padding: 4px 14px;
            cursor: pointer;
        }
    }

    button {
        margin-top: 12px;
    }

`;

export const Dropdown = styled.div<IDropDown>`
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

        display: ${props => props.visiblemn};
        grid-template-columns: 1fr;
        grid-gap: 18px;

        width: 100%;
        max-height: 100px;

        overflow-y: scroll;

        padding: 16px;

        font-size: 13px;
        color: #828fa3;

        background-color: #20212c;

        li {
            cursor: pointer;
        }

    }

`;