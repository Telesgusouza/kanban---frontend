import { IRootReducer } from '../../Config/interface';
import * as Styled from './styled';

import themeJson from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../Config/ActionTypes';

export default function CardOptionTask() {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    const dispatch = useDispatch();

    async function optionTask(value: boolean) {

        if (value) {
            dispatch({
                type: ActionTypes.card,
                payload: "edit"
            })
        } else {
            dispatch({
                type: ActionTypes.card,
                payload: "del"
            })
        }



    }

    return (
        <Styled.Container bg={ theme ? themeJson.lightGray : themeJson.veryDarkGray } >
            <p onClick={() => optionTask(true)}  >Editar tarefa</p>
            <p onClick={() => optionTask(false)} >Deletar tarefa</p>
        </Styled.Container>
    )
}