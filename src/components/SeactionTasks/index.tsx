import * as Styled from './styled';

import themeJson from '../../assets/theme';
import { useSelector } from 'react-redux';
import { IColumn, IRootReducer } from '../../Config/interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../Config/BaseUrl';
import { toast } from 'react-toastify';

/*


*/

export default function SeactionTasks() {

    const { visible } = useSelector((rootReducer: IRootReducer) => rootReducer.useVisibleMenu);
    const { board } = useSelector((rootReducer: IRootReducer) => rootReducer.useBoard);

    const [columns, setColumns] = useState<IColumn[]>([]);

    useEffect(() => {

        async function getColums() {

            const auth = localStorage.getItem("authentication");

            if (auth && board) {
                const token = JSON.parse(auth)

                const datas = await axios.get(`${base_url}/api/v1/columns/${board.board.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                    }
                }).catch((e) => {
                    toast.error("Erro ao trazer as colunas");
                    console.error("Error columns > ", e);
                });

                const listColumns = datas?.data ? datas?.data.columns : [];
                setColumns(listColumns);

            }

        }

        getColums();

    }, [board])

    return (
        <Styled.Container minus={visible ? "0" : "310"} >

            {columns.length > 0 ? columns.map(resp => (
                <article>
                    <Styled.Info>
                        <div />

                        <p>{resp.name} ({resp.tasks.length})</p>
                    </Styled.Info>

                    <Styled.TaskList bg={themeJson.darkGray} cl={themeJson.white}>
                        {resp.tasks.length > 0 ? (
                        <li >
                            <strong>Crie UI para fluxo de integração</strong>
                            <span>0 de 3</span>
                        </li>) : (<><></></>)}

                        <li >
                            <strong>Crie UI para fluxo de integração</strong>
                            <span>0 de 3</span>
                        </li>


                    </Styled.TaskList>

                </article>)) : (<><></></>)}


            {/* 

            <article>
                <Styled.Info>
                    <div />

                    <p>Todo (4)</p>
                </Styled.Info>

                <Styled.TaskList bg={themeJson.darkGray} cl={themeJson.white}>
                    <li >
                        <strong>Crie UI para fluxo de integração</strong>
                        <span>0 de 3</span>
                    </li>

                    <li>
                        <strong>Crie UI para fluxo de integração</strong>
                        <span>0 de 3</span>
                    </li>

                    <li>
                        <strong>Crie UI para fluxo de integração</strong>
                        <span>0 de 3</span>
                    </li>

                    <li>
                        <strong>Crie UI para fluxo de integração</strong>
                        <span>0 de 3</span>
                    </li>
                </Styled.TaskList>

            </article> */}

        </Styled.Container>
    )
}