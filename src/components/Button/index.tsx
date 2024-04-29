import { ReactNode } from "react";
import * as Styled from './styled';

import { useSelector } from "react-redux";
import { IRootReducer } from "../../Config/interface";

interface IProps {
    children: ReactNode, 
    type?: string, 
    onClick?: React.MouseEventHandler<HTMLButtonElement>;

    mg?: number;
    del?: boolean;
    light?: boolean;
}

export default function Button({ children, type, onClick, light, mg=0, del=false }: IProps) {


    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme)

    return (
        <>
            <Styled.Button 
                
                del={del ? "background-color: #ea5555; color: #ffffff;" : ""}
                mg={mg} 
                type={type === "button" || type ===  "submit" || type ===  "reset"  ? type : "button" } 
                onClick={onClick} 

                light={light && light !== undefined ? `background-color: ${theme ? "rgba(99, 95, 199, .10)" : "rgba(255, 255, 255, 1)"};color: rgba(99, 95, 199, 1);` : ""} 
                >
                
                {children}
            </Styled.Button>

        </>
    )
}

