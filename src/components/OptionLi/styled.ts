import styled from "styled-components";

interface IProps {
    cl?: string;
}

export const Option = styled.div<IProps>`
    font-size: 13px;
    font-weight: 500;

    padding: 8px 14px;
    border: 1px solid #828FA3;
    border-radius: 4px;

    color: ${props => props.cl};

`;