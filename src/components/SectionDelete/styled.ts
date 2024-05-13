import styled from "styled-components";

interface IProps {
    bg: string;
}

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    padding: 30px 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 40;

    width: 100vw;
    min-height: 100vh;

    background-color: rgba(0, 0, 0, .2);

`;

export const ContainerButton = styled.div`
    width: 100%;
    max-width: 480px;

    margin-bottom: 15px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;

    img {
        cursor: pointer;
    }
`;


export const ContainerContent = styled.form<IProps>`
    width: 100%;
    max-width: 480px;
    padding: 32px;

    border-radius: 6px;

    display: flex;
    flex-direction: column;
    
    background-color: ${props => props.bg};

    div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
    }

    strong {
        font-size: 18px;
        font-size: 1.125rem;
        font-weight: 700;

        margin-bottom: 24px;

        color: #ea5555;
    }

    p {
        font-size: 13px;
        color: #828fa3;
        margin-bottom: 24px;

        white-space: break-spaces;
    }
`;
