import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import * as Styled from './styled';

import Button from '../Button';

import { IColumn, IRootReducer } from '../../Config/interface';
import themeJson from '../../assets/theme';

import base_url from '../../Config/BaseUrl';
import FormTask from '../FormTask';

export default function Header() {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);
    const { board } = useSelector((rootReducer: IRootReducer) => rootReducer.useBoard);

    const [columns, setColumns] = useState<IColumn[]>([]);
    const [toggleAddTask, setToggleAddTask] = useState<boolean>(false);

    const [toggleBoardEdit, setToggleBoardEdit] = useState<boolean>(false);

    useEffect(() => {

        async function getData() {
            const auth = localStorage.getItem("authentication");

            if (auth && board) {
                const token = JSON.parse(auth)

                const datas = await axios.get(`${base_url}/api/v1/columns/${board.board.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                    }
                }).catch((e) => {
                    console.error(e);
                });

                const listColumns = datas?.data ? datas?.data.columns : [];

                setColumns(listColumns);
            }
        }

        getData();

    }, [board]);

    function closeTask() {
        setToggleAddTask(false);
        return null;
    }

    return (
        <Styled.Container bg={theme ? themeJson.white : themeJson.darkGray} cl={theme ? themeJson.black : themeJson.white} >

            {toggleAddTask && (
                <>
                    <FormTask edit={false} closeTask={() => closeTask()} />
                </>
            )}

            <h2>{board.board ? board.board.name : ""}</h2>

            <Styled.ContainerRight opbutton={columns.length > 0 ? "1" : ".4"}  >
                <Button onClick={() => setToggleAddTask(true)} >+Add nova tarefa</Button>

                <div onClick={() => setToggleBoardEdit(!toggleBoardEdit)} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {toggleBoardEdit && (
                    <>
                    
                    </>
                )}
            </Styled.ContainerRight>
        </Styled.Container>
    )
}