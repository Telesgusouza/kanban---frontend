import styled from "styled-components";

interface IProps {
    width: string;
    heigth: string;
}

export const Loading = styled.div<IProps>`

    @keyframes loading {
        0% {
            background-position: 0%;
        }

        50% {
            background-position: 100%;
        }

        100% {
            background-position: 0%;
        }
    }

    background: transparent;
    width: ${props => props.width};
    height: ${props => props.heigth};
    
    background-image: linear-gradient(45deg, transparent, #c3c3c3, transparent);
    background-size: 400%;
    animation: loading 1.2s linear infinite;
`;