import React, { FC } from "react"
import { useSelector } from 'react-redux';

import * as Styled from './styled';

import { IBoard, IRootReducer, ITask } from "../../Config/interface";
import Button from '../Button';
import themeJson from '../../assets/theme';
import { toast } from "react-toastify";
import axios from "axios";
import base_url from "../../Config/BaseUrl";

import closeImg from '../../assets/icons/icon-cross.svg'

interface IProps {
    closeBoard: FC;
    board?: IBoard;
    task?: ITask;
}

export default function SectionDelete({ closeBoard, board, task }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (board) {

            const auth = localStorage.getItem("authentication");

            if (auth) {
                const token = JSON.parse(auth);

                await axios.delete(`${base_url}/api/v1/boards/${board.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        toast.success("Board deletado com sucesso");
                        closeBoard({});
                    })
                    .catch(e => {
                        toast.error("Erro ao deletar board");
                        console.error(e)
                    });
            }



        } else if (task) {
            const auth = localStorage.getItem("authentication");

            if (auth) {
                const token = JSON.parse(auth).token;

                console.log("=======================================")
                console.log(token)
                console.log(task.id)

                await axios.delete(`${base_url}/api/v1/tasks/${task.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).catch((e) => {
                    console.error("Error > ", e);
                    if (e.response) {
                        // O servidor respondeu com um status fora do intervalo de 2xx
                        console.error("Response data:", e.response.data);
                        console.error("Response status:", e.response.status);
                        console.error("Response headers:", e.response.headers);
                    } else if (e.request) {
                        // A requisição foi feita, mas não houve resposta
                        console.error("Request:", e.request);
                    } else {
                        // Algo aconteceu na configuração da requisição que disparou um erro
                        console.error("Error message:", e.message);
                    }
                });

                toast.success("Deletado com sucesso");

                setTimeout(() => {
                    closeBoard({});
                }, 500)

            }
        }

    }

    return (
        <Styled.Container>

            <Styled.ContainerButton>

                <img src={closeImg} alt="fechar" onClick={closeBoard} />

            </Styled.ContainerButton>

            <Styled.ContainerContent bg={theme ? themeJson.white : themeJson.darkGray} onSubmit={handleDelete} >
                <strong>Deletar este {board ? "board" : "task"}?</strong>
                <p>{board ? `Tem certeza de que deseja excluir o quadro ‘${board.name}’? Esta ação removerá todas as colunas e tarefas e não poderá ser revertida.`
                    : `Tem certeza de que deseja excluir a tarefa ‘${task?.title}’ e suas subtarefas? Esta ação não pode ser revertida.`}</p>

                <div>
                    <Button del type="submit" >Deletar</Button>
                    <Button light type="button" onClick={() => closeBoard({})} >Cancelar</Button>
                </div>


            </Styled.ContainerContent>
        </Styled.Container>
    )
}