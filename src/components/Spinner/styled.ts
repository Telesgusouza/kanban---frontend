import styled from "styled-components";

export const Spinner = styled.img`
    width: 20px;

    @keyframes loading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }


    animation: loading 1.4s linear infinite;
`;