import { FC } from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './styled';

import OptionLi from '../OptionLi';
import closeImg from '../../assets/icons/icon-cross.svg';
import Button from '../Button';

import { IRootReducer } from '../../Config/interface';
import themeJson from "../../assets/theme";

interface IProps {
    edit: boolean;
    closeTask: FC;
}

export default function FormTask({ edit, closeTask }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (edit) {
            //
        } else {
            //
        }

        closeTask({});
    }

    return (
        <Styled.Container onSubmit={handleSubmit} cl={theme ? themeJson.black : themeJson.white} bg={theme ? themeJson.white : themeJson.darkGray} >

            <h3>{edit ? "Edit" : "Add Nova"} Tarefa</h3>

            <label htmlFor="title">
                Titulo
                <input type="text" placeholder='Adicione Task' />
            </label>

            <label htmlFor="description">
                Descrição
                <textarea placeholder='Adicione a descrição' />
            </label>

            <label htmlFor="subtasks">
                Subtasks

                <ul>

                    <li  >
                        <OptionLi>
                            Todo
                        </OptionLi>
                        <img src={closeImg} alt="" />
                    </li>

                </ul>

                <input type="text" placeholder='Nova Subtarefa' />

                <Button light >+Add Nova Subtarefa</Button>

            </label>

            <label htmlFor="column">
                Status
                <span>Será adicionado</span>
            </label>

            <Button>Criar Tarefa</Button>

        </Styled.Container>
    )
}