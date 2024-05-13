import { useState } from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styled';

import imgCheck from '../../assets/icons/icon-check.svg';
import { IRootReducer, ISubTask } from '../../Config/interface';
import themeJson from '../../assets/theme';

interface IProps {

    subtask: ISubTask;

    onSelect: (value: ISubTask) => void;
}

export default function Checkedbox({ subtask, onSelect }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    const [check, setCheck] = useState(subtask.checkbox);

    function handleToggleSelect() {
        subtask["checkbox"] = !subtask.checkbox;
        const data: ISubTask = subtask;
        onSelect(data);
        setCheck(subtask.checkbox)
    }

    return (
        <Styled.Container 
        op={check ? "0.4" : "1"} 
        done={check ? "line-through" : "none"} 
        bg={theme ? themeJson.lightGray : themeJson.veryDarkGray} 
        cl={theme ? "0, 1, 18" : "255, 255, 255"} >

            <Styled.Checkbox check={check ? "check" : "no-check"} bg={theme ? themeJson.white : themeJson.linesDark } >
                <img src={imgCheck} alt="checkbox" />
                <input type="checkbox" checked={check} onChange={handleToggleSelect} />
            </Styled.Checkbox>

            <p>{subtask.title}</p>
        </Styled.Container>
    )
}
