import { useState } from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styled';

import themeJson from '../../assets/theme';
import { IColumn, IRootReducer } from '../../Config/interface';
import imgArrowUp from '../../assets/icons/icon-chevron-up.svg';
import imgArrowDown from '../../assets/icons/icon-chevron-down.svg';


interface IProps {
    list: IColumn[];
    current: IColumn;
    onSelect: (value: IColumn) => void;
}

export default function Dropdown({ list, current, onSelect }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
    const [currentColumn, setCurrentColumn] = useState<IColumn>(current);

    function handleSelectColumn(column: IColumn) {
        setCurrentColumn(column);
        onSelect(column)
        setToggleDropDown(false);
    }

    return (
        <Styled.Dropdown 
            visiblemn={toggleDropDown ? "grid" : "none"} 
            bg={theme ? themeJson.white : themeJson.veryDarkGray} 
        >

            <label htmlFor="columns">
                <span>Coluna</span>


                <div onClick={() => setToggleDropDown(!toggleDropDown)} >
                    <p>{currentColumn.name} </p>
                    <img src={toggleDropDown ? imgArrowUp : imgArrowDown} alt="imagem seta" />
                </div>


                <ul>
                    {list.length > 0 && list.map(resp => (

                        <li key={resp.id} onClick={() => handleSelectColumn(resp)} >{resp.name}</li>

                    ))}
                </ul>

            </label>


        </Styled.Dropdown>
    )
}
