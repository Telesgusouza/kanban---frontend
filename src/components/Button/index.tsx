import { ReactNode } from "react";
import * as Styled from './styled';
import { useSelector } from "react-redux";
import { IRootReducer } from "../../Config/interface";

interface IProps {
    children: ReactNode, 
    type?: string, 
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    light?: boolean;
}

export default function Button({ children, type, onClick, light }: IProps) {


    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme)

    return (
        <>
            <Styled.Button bglight={theme ?  "light" : "dark" } type={type === "button" || type ===  "submit" || type ===  "reset"  ? type : "button" } onClick={onClick} light={light ? "light" : ""} >
                {children}
            </Styled.Button>

        </>
    )
}

