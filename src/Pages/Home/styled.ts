import styled from "styled-components";

interface IProps {
    bg: string;
}

export const Container = styled.section<IProps>`
    display: flex;
    flex-direction: row;

    max-width: 100vw;
    /* overflow: hidden; */
    
    min-height: 100vh;

    background-color: ${props => props.bg};
`;

export const ContainerRight = styled.div`
    width: 100%;
`;
