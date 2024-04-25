import React, { FC } from "react"
import { useSelector } from 'react-redux';

import * as Styled from './styled';

import { IBoard, IRootReducer } from "../../Config/interface";
import Button from '../Button';
import themeJson from '../../assets/theme';
import { toast } from "react-toastify";
import axios from "axios";
import base_url from "../../Config/BaseUrl";

interface IProps {
    closeBoard: FC;
    board?: IBoard;
    task?: string;
}

export default function SectionDelete({ closeBoard, board, task }: IProps) {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (board) {
            
            const auth = localStorage.getItem("authentication");

            if(auth) {
                const token = JSON.parse(auth);

                console.log("=============================");
                console.log(`${base_url}/api/v1/boards/${board.id}`)
                console.log(token.token)
                console.log(board.id)

                await axios.delete(`${base_url}/api/v1/boards/${board.id}`, {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    toast.success("Board deletado com sucesso");
                    closeBoard({});
                })
                .catch(e => {
                    toast.error("Erro ao deletar board");
                });
            }



        } else if (task) {
            toast.warn("Ainda será adicionado!");
        }

    }

    return (
        <Styled.Container bg={theme ? themeJson.white : themeJson.darkGray} onSubmit={handleDelete} >
            <strong>Deletar este {board ? "board" : "task"}?</strong>
            <p>{board ? `Tem certeza de que deseja excluir o quadro ‘${board.name}’? Esta ação removerá todas as colunas e tarefas e não poderá ser revertida.` 
            : `Tem certeza de que deseja excluir a tarefa ‘${task}’ e suas subtarefas? Esta ação não pode ser revertida.`}</p>
            
            <div>
                <Button del type="submit" >Deletar</Button>
                <Button light type="button" onClick={() => closeBoard({})} >Cancelar</Button>
            </div>


        </Styled.Container>
    )
}