import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './styled';

import OptionLi from '../OptionLi';
import closeImg from '../../assets/icons/icon-cross.svg';
import imgArrowUp from '../../assets/icons/icon-chevron-up.svg';
import imgArrowDown from '../../assets/icons/icon-chevron-down.svg';
import Button from '../Button';

import { IColumn, IRootReducer, ISubTask, ITask } from '../../Config/interface';
import themeJson from "../../assets/theme";
import { toast } from 'react-toastify';
import axios from 'axios';
import base_url from '../../Config/BaseUrl';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../Spinner';

interface IProps {
    edit: boolean;
    closeTask: FC;
    column?: IColumn;
    task?: ITask;
}


export default function FormTask({ edit, closeTask, column, task }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);
    const { board } = useSelector((rootReducer: IRootReducer) => rootReducer.useBoard);

    const [toggleDropDown, setToggleDropDown] = useState<boolean>();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [titleSubtask, setTitleSubtask] = useState<string>("");
    const [listSubtasks, setListSubtasks] = useState<ISubTask[]>([]);
    const [oldListSubtasks, setOldListSubtasks] = useState<ISubTask[]>([]);

    const [listColumns, setListColumns] = useState<IColumn[]>([]);
    const [currentColumns, setCurrentColumns] = useState<IColumn | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            const auth = localStorage.getItem("authentication");

            if (auth) {
                const token = JSON.parse(auth).token;

                if (edit && task) {

                    const data = await axios.get(`${base_url}/api/v1/tasks/${task.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    setTitle(data.data.title);
                    setDescription(data.data.description);

                    setListSubtasks(data.data.subtasks)
                    setOldListSubtasks(data.data.subtasks)

                }
            }
        }

        getData();
    }, [])

    useEffect(() => {

        async function getColumns() {
            const auth = localStorage.getItem("authentication");
            if (auth && board.board.id.length > 0) {
                const token = JSON.parse(auth);

                const listDatas = await axios.get(`${base_url}/api/v1/columns/${board.board.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                }).catch((e) => {
                    console.error("Error columns > ", e);
                    toast.error("Erro ao trazer colunas");
                });

                setListColumns(listDatas?.data ? listDatas?.data.columns : []);


                if (listDatas?.data) {
                    setCurrentColumns(column ? column : listDatas.data.columns[0]);
                } else {
                    setCurrentColumns(null);
                }

            }
        }

        getColumns()

    }, [board])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        const auth = localStorage.getItem("authentication");

        if (title.length > 0 && auth && currentColumns?.id) {

            if (edit && task) {
                const token = JSON.parse(auth).token;

                const data = {
                    title: title,
                    description: description
                }

                await axios.put(`${base_url}/api/v1/tasks/${task.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).catch((e) => {
                    console.error("Error > ", e);
                    toast.warn("Error ao atualizar tarefa");
                })


                for (let i = 0; i < listSubtasks.length; i++) {

                    const element = listSubtasks[i];

                    if (oldListSubtasks.find(tk => tk.id === element.id) === undefined) {

                        await axios.post(`${base_url}/api/v1/tasks/subtasks/${task.id}`, {
                            title: element.title
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        }).catch((e) => {
                            console.error("Error > ", e);
                            toast.warn("Erro ao adicionar subtask");
                        })
                    }
                }

                if (column?.id !== currentColumns.id) {

                    await axios.post(`${base_url}/api/v1/tasks`, {
                        idColumn: currentColumns.id,
                        idTask: task.id
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                }

                closeTask({});

            } else {
                const token = JSON.parse(auth);

                const data = {
                    title: title,
                    description: description.length > 0 ? description : "",
                }

                const postData = await axios.post(`${base_url}/api/v1/tasks/${currentColumns.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                    }
                }).catch((e) => {
                    console.error("Error > ", e);
                    toast.error("Erro ao adicionar tarefa");
                    setLoading(false);
                })


                if (listSubtasks && postData?.data) {
                    for (let i = 0; i < listSubtasks.length; i++) {

                        await axios.post(`${base_url}/api/v1/tasks/subtasks/${postData.data.id}`, { title: listSubtasks[i].title }, {
                            headers: {
                                'Authorization': `Bearer ${token.token}`,
                            }
                        });
                    }
                }

                toast.success("Tarefa criada com sucesso");
                closeTask({});
                setLoading(false);

            }

        } else if (title.length === 0) {
            toast.warn("Preencha os campos");
            setLoading(false);
        }

        setLoading(false);

    }

    function handleAddSubtask() {

        if (titleSubtask.length > 0) {
            const list = [...listSubtasks];

            list.push({
                id: uuidv4(),
                checkbox: false,
                title: titleSubtask
            });

            setListSubtasks(list);

            setTitleSubtask("");
        } else {
            toast.warn("preencha o campo para adicionar subtask")
        }

    }

    async function handleDeleteSubtask(id: string | null = null, index: number) {

        if (id !== null) {
            const auth = localStorage.getItem("authentication");

            if (auth) {
                const token = JSON.parse(auth);

                await axios.delete(`${base_url}/api/v1/tasks/subtasks/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                })
                    .catch(e => {
                        console.error("Error > ", e);
                        toast.warn("Ocorreu um erro ao deletar uma subtarefa");
                    })
            }
        }

        const list = [...listSubtasks];
        list.splice(index, 1);
        setListSubtasks(list);
    }

    function handleSelectColumn(column: IColumn) {
        setCurrentColumns(column);
        setToggleDropDown(false);
    }

    return (
        <Styled.Container>

            <Styled.ContainerButton>
                <img src={closeImg} alt="fechar janela" onClick={closeTask} />
            </Styled.ContainerButton>

            <Styled.ContainerContent onSubmit={handleSubmit} cl={theme ? themeJson.black : themeJson.white} bg={theme ? themeJson.white : themeJson.darkGray} >

                <h3>{edit ? "Edit" : "Add Nova"} Tarefa</h3>

                <label htmlFor="title">
                    Titulo
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={`${edit ? "Editar" : "Adicione"} Task`} />
                </label>

                <label htmlFor="description">
                    Descrição
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={`${edit ? "Editar" : "Adicione"} a descrição`} />
                </label>

                <label htmlFor="subtasks">
                    Subtasks

                    <ul>

                        {listSubtasks.length > 0 && listSubtasks.map((resp, index) => (
                            <li key={resp.id} >
                                <OptionLi>
                                    {resp.title}
                                </OptionLi>
                                <img src={closeImg} alt="" onClick={() => handleDeleteSubtask(resp?.id ? resp.id : null, index)} />
                            </li>
                        ))}

                    </ul>

                    <input type="text" value={titleSubtask} onChange={e => setTitleSubtask(e.target.value)} placeholder='Nova Subtarefa' />

                    <Button light type='button' onClick={handleAddSubtask} >+Add Nova Subtarefa</Button>

                </label>

                {listColumns.length > 0 && (
                    <Styled.Dropdown visiblemn={toggleDropDown ? "grid" : "none"} >

                        <label htmlFor="columns">
                            Coluna


                            <div onClick={() => setToggleDropDown(!toggleDropDown)} >
                                <p>{currentColumns?.name} </p>
                                <img src={toggleDropDown ? imgArrowUp : imgArrowDown} alt="imagem seta" />
                            </div>


                            <ul>
                                {listColumns.length > 0 && listColumns.map(resp => (

                                    <li key={resp.id} onClick={() => handleSelectColumn(resp)} >{resp.name}</li>

                                ))}
                            </ul>

                        </label>


                    </Styled.Dropdown>
                )}

                <Button type='submit' > {loading ? <Spinner /> : `${edit ? "Editar" : "Criar"} Tarefa`}</Button>

            </Styled.ContainerContent>
        </Styled.Container>
    )
}