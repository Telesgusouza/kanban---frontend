import styled, { css } from "styled-components";

interface IProps {
    option?: string;
    optionadd?: string;
    togglemenu?: string;
    theme?: string;
}

interface ITheme {
    theme?: string;
}

export const Container = styled.menu`
    
    position: relative;

    ul {
        margin-top: 26px;
        margin-bottom: 30px;
    }

    strong {
        color: #828fa3;
        font-weight: 600;
        text-transform: uppercase;

        padding-left: 26px;
    }

`;

export const ContentMenu = styled.div<IProps>`
     display: flex;
    flex-direction: column;

    justify-content: space-between;

    width: 300px;
    min-height: 100vh;

    padding: 26px 26px 26px 0;

    background-color: ${props => props.theme};
    box-shadow: 0 0 10px rgba(151,151,151, .3);

    overflow: hidden;

    transition: all .2s ease;

    ${props => props.togglemenu === "visible" && css`
        transition: all .2s ease;    
    
        position: absolute;
        top: 0;
        left: -300px;
    `}

    @media (max-width: 900px) {
        display: none;
    }
`;

export const Visible = styled.div<IProps>`
    position: fixed;
    bottom: 40px;
    left: 0;

    width: fit-content;
    padding: 18px 22px;
    background-color: #635fc7;

    border-end-end-radius: 40px;
    border-top-right-radius: 40px;

    cursor: pointer;

    ${props => props.togglemenu === "visible" && css`
        transition: all .2s ease;    
        opacity: .2;
      
        left: -300px;
    `}
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Li = styled.li<IProps>`
    display: flex;
    align-items: center;

    color: #828fa3;
    font-weight: 600;

    padding: 14px;
    padding-left: 26px;

    border-end-end-radius: 30px;
    border-top-right-radius: 30px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;

    ${props => props.option === "select" && css`
        background-color: #635fc7;
        color: white;
    `}

    ${props => props.optionadd === "select" && css`
        color: #635fc7;
    `}

    img {
        margin-right: 14px;
    }

`;

export const Icone = styled.img`
    width: 100%;
    max-width: 155px;
    margin-bottom: 40px;

    padding-left: 26px;
`

export const ContainerTheme = styled.div<IProps>`
    display: flex;
    flex-direction: row !important ;
    justify-content: center;
    align-items: center;

    padding: 14px;

    background-color: ${props => props.theme};

`;

export const Theme = styled.div<ITheme>`
    background-color: #635fc7;
    
    width: 40px;
    height: 20px;

    margin: 0 20px;

    border-radius: 20px;

    position: relative;

    cursor: pointer;

    &::after {
        content: "";
        position: absolute;
        top: 3px;
        left: ${props => props.theme};

        width: 14px;
        height: 14px;
        background-color: white; 

        border-radius: 50%;

        transition: all .2s ease;
    }
`;

export const ContainerHidden = styled.div`
    display: flex;
    align-items: center;
    
    margin-top: 22px;

    color: #828fa3;
    font-size: .9rem;
    font-weight: 600;

    cursor: pointer;

    img {
        margin-right: 15px;
    }
`;

export const ImgClose = styled.div`
    display: flex;
    justify-content: end;

    width: 100%;
    max-width: 480px;

    img {
        width: 19px;
        cursor: pointer;
    }
`;

export const ContainerToggle = styled.div`
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
    justify-content: space-between;
    align-items: center;
`;

export const ButtonClose = styled.button`
    padding: 7px 18px;
    
    border: none;
    white-space: nowrap;

    background-color: #ea5555;
    color: white;
    font-weight: 600;

`;
