import * as Styled from "./styled";

import Menu from "../../components/Menu";
import Header from "../../components/Header";

import themeJson from '../../assets/theme';
import { useSelector } from "react-redux";
import { IRootReducer } from "../../Config/interface";
import SeactionTasks from "../../components/SeactionTasks";

export default function Home() {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme)

    return (
        <Styled.Container bg={theme ? themeJson.linesLight : themeJson.veryDarkGray} >
            <Menu />
            <Styled.ContainerRight>
                <Header />
                <SeactionTasks />
            </Styled.ContainerRight>
        </Styled.Container>
    )
}