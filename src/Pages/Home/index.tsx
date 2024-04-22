import Menu from "../../components/Menu";
import * as Styled from "./styled";

import theme from '../../assets/theme';

export default function Home() {

    return (
        <Styled.Container bg={theme.linesLight} >
            <Menu />
        </Styled.Container>
    )
}