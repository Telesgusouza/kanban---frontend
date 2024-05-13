import styled from "styled-components";

interface IProps {
    bg: string;
}

export const Container = styled.div<IProps>`
    position: absolute;
    top: calc(100% + 6px);

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;

    padding: 16px;

    font-size: .81rem;

    border-radius: 8px;
    box-shadow: 0 0 7px rgba(130, 142, 163, .08);

    background-color: ${props => props.bg};

    p {
        cursor: pointer;

        &:nth-child(1) {
            color: #828fa3;
        }

        &:nth-child(2) {
            color: #ea5555;
        }
    }
`;
