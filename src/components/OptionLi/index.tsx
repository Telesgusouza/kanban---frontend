import { ReactNode } from "react";
import * as Styled from './styled'
import { useSelector } from "react-redux";
import { IRootReducer } from "../../Config/interface";

import themeJson from '../../assets/theme';

export default function OptionLi({ children }: { children: ReactNode }) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme)

    return (
        <>
            <Styled.Option cl={theme ? themeJson.black : themeJson.white } >
                {children}
            </Styled.Option>

        </>
    )
}