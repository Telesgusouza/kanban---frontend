import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from './styled';

import themeJson from '../../assets/theme';
import { IColumn, IRootReducer, ITask } from '../../Config/interface';

import base_url from '../../Config/BaseUrl';
import { toast } from 'react-toastify';
import Button from '../Button';

import closeImg from '../../assets/icons/icon-cross.svg';
import FormTask from '../FormTask';
import Task from '../Task';
import SectionDelete from '../SectionDelete';
import ActionTypes from '../../Config/ActionTypes';
import AddBoard from '../AddBoard';

export default function SeactionTasks() {

    const { visible } = useSelector((rootReducer: IRootReducer) => rootReducer.useVisibleMenu);
    const { board } = useSelector((rootReducer: IRootReducer) => rootReducer.useBoard);
    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);
    const { card } = useSelector((rootReducer: IRootReducer) => rootReducer.useCard);

    const [currentColumn, setCurrentColumn] = useState<IColumn>();
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [toggleAddTask, setToggleAddTask] = useState<boolean>(false);

    const [toggleTask, setToggleTask] = useState<boolean>(false);
    const [toggleCard, setToggleCard] = useState<{ toggle: boolean, card: "del" | "edit" | "void" }>({ toggle: false, card: "void" });
    const [toggleAddBoard, setToggleAddBoard] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>();

    const dispatch = useDispatch();

    useEffect(() => {

        getColums();

    }, [board])

    useEffect(() => {

        setToggleTask(false);

        switch (card) {
            case "del": {
                setToggleCard({ toggle: true, card: "del" });

                dispatch({
                    type: ActionTypes.card,
                    payload: { card: "void" }
                });

                break;
            }

            case "edit": {
                setToggleCard({ toggle: true, card: "edit" });

                dispatch({
                    type: ActionTypes.card,
                    payload: { card: "void" }
                });

                break;
            }
        }

        if (card === "del") {
            dispatch({
                type: ActionTypes.card,
                payload: { card: "void" }
            });
        }

        if (card === "edit") {
            dispatch({
                type: ActionTypes.card,
                payload: { card: "void" }
            });
        }

    }, [card])

    async function getColums() {

        const auth = localStorage.getItem("authentication");

        if (auth && board) {
            const token = JSON.parse(auth)

            const datas = await axios.get(`${base_url}/api/v1/columns/${board.board.id}`, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            }).catch((e) => {
                toast.error("Erro ao trazer as colunas");
                console.error("Error columns > ", e);
            });

            const listColumns = datas?.data ? datas?.data.columns : [];
            setColumns(listColumns);

        }

    }

    function closeCard() {

        setToggleAddTask(false);
        setToggleTask(false);
        setToggleCard({ toggle: false, card: "void" });
        getColums();

        setToggleAddBoard(false)

        return null;
    }

    function openColumn(column: IColumn) {
        setToggleAddTask(true);
        setCurrentColumn(column);
    }

    function openTask(task: ITask, column: IColumn) {
        setToggleTask(true);
        setCurrentTask(task);
        setCurrentColumn(column);
    }

    return (
        <Styled.Container minus={visible ? "0" : "310"}>

            {toggleAddBoard && (
                <>
                    <AddBoard closeBoard={closeCard} />
                </>
            )}

            {toggleCard.toggle && toggleCard.card === "del" && (
                <SectionDelete closeBoard={closeCard} task={currentTask} />
            )}

            {toggleCard.toggle && toggleCard.card === "edit" && (
                <FormTask closeTask={closeCard} edit={true} column={currentColumn} task={currentTask} />
            )

            }

            {toggleTask && currentTask && (
                <Styled.ContainerPopUp>

                    <Styled.ContainerButton>
                        <img src={closeImg} alt="fechar janela" onClick={closeCard} />
                    </Styled.ContainerButton>

                    {currentColumn && (
                        <>
                            <Task idtask={currentTask?.id ? currentTask?.id : ""} columns={columns} currentColumn={currentColumn} />
                        </>
                    )}

                </Styled.ContainerPopUp>
            )}

            {toggleAddTask && (
                <Styled.ContainerPopUp>

                    <Styled.ContainerButton>
                        <img src={closeImg} alt="fechar janela" onClick={closeCard} />
                    </Styled.ContainerButton>

                    <FormTask edit={false} closeTask={() => closeCard()} column={currentColumn} />

                </Styled.ContainerPopUp>
            )}

            {columns.length > 0 ? columns.map(resp => (
                <article>
                    <Styled.Info clcolumn={resp.cor} >
                        <div />

                        <p>{resp.name} ({resp.tasks.length})</p>
                    </Styled.Info>

                    <Styled.TaskList bg={theme ? themeJson.white : themeJson.darkGray} cl={theme ? themeJson.black : themeJson.white}>
                        {resp.tasks.length > 0 ? resp.tasks.map((resptask: ITask) => (
                            <li key={resptask.id} onClick={() => openTask(resptask, resp)} >
                                <strong>{resptask.title} </strong>
                                <span>{resptask.feats} de {resptask.pending}</span>
                            </li>
                        )) : (
                            <>
                                <Styled.AddTask>
                                    <span>Crie uma tarefa</span>
                                    <Button onClick={() => openColumn(resp)} >criar tarefa</Button>
                                </Styled.AddTask>
                            </>)}


                    </Styled.TaskList>

                </article>)) : (<><></></>)}

            <Styled.ContainerAddBoard onClick={() => setToggleAddBoard(true)} >
                <strong>+ Novo Board</strong>
            </Styled.ContainerAddBoard>

        </Styled.Container>
    )
}