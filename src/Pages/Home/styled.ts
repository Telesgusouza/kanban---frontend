import styled from "styled-components";

interface IProps {
    bg: string;
}

export const Container = styled.section<IProps>`
    min-height: 100vh;

    background-color: ${props => props.bg};
    
`;
