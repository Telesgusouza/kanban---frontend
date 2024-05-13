import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../Config/interface';
import axios from 'axios';
import base_url from '../../Config/BaseUrl';

import * as Styled from './styled'
import { toast } from 'react-toastify';

import closeImg from '../../assets/icons/icon-cross.svg';

import Button from '../Button';
import Input from '../Input';


import themeJson from '../../assets/theme';
import OptionLi from '../OptionLi';
import Spinner from '../Spinner';


export default function AddBoard({ closeBoard }: { closeBoard: FC }) {

    const [name, setName] = useState<string>("");

    const [listColumns, setListColumns] = useState<string[]>(["Todo", "Doing"])
    const [nameColumn, setNameColumn] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

    async function handleCreateBoard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        const auth = localStorage.getItem("authentication");
        if (auth && name.trim().length > 0) {
            const token = JSON.parse(auth).token;

            const data = await axios.post(base_url + "/api/v1/boards", { name: name }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).catch(e => {
                toast.error("Error ao adicionar Board");
                console.error(e);

                setLoading(false);
            })

            for (let i = 0; i <= listColumns.length - 1; i++) {
                console.log("i > " + listColumns[i])
                await axios.post(base_url + "/api/v1/columns/" + data?.data.id, { name: listColumns[i], cor: "#d3d3d3" }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).catch(e => {
                    toast.error("Error ao adicionar Coluna");
                    console.error(e);
                    setLoading(false);
                })
            }

            setLoading(false);
            toast.success("Board criado com sucesso");
            closeBoard({});

        } else {
            toast.warn("Preencha o campo nome");
            setLoading(false);
        }

    }

    function addColumn() {
        if (nameColumn.trim().length > 0) {
            const list: string[] = [...listColumns];
            list.push(nameColumn);

            setListColumns(list);
            setNameColumn("");
        }
    }

    function deleteColumn(index: number) {
        const list: string[] = [...listColumns];
        list.splice(index, 1);

        setListColumns(list);
    }

    return (
        <Styled.ContainerToggle>
            <Styled.ContainerButton>
                <Styled.ImgClose>
                    <img src={closeImg} alt="fechar" onClick={() => closeBoard({})} />
                </Styled.ImgClose>
            </Styled.ContainerButton>

            <Styled.ContentAdd onSubmit={handleCreateBoard} cl={theme ? themeJson.black : themeJson.white} bg={theme ? themeJson.white : themeJson.darkGray} >

                <strong>Add novo board</strong>

                <label htmlFor="name">
                    <span>Nome</span>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Nome do board' />
                </label>


                {listColumns.length > 0 && (<>
                    <span>Colunas</span>

                    <ul>
                        {listColumns.map((resp, index) => (<>
                            <li key={resp} onClick={() => deleteColumn(index)} >
                                <OptionLi>
                                    {resp}
                                </OptionLi>
                                <img src={closeImg} alt="" />
                            </li>
                        </>))}
                    </ul>
                </>)}

                <label htmlFor="name" style={{ marginTop: 20 }} >
                    <span>Nome da coluna </span>
                    <Input type="text" value={nameColumn} onChange={e => setNameColumn(e.target.value)} placeholder='Nome da coluna' />
                </label>

                <Button type='button' onClick={addColumn} light mg={24} >+Add nova coluna</Button>

                <Button type='submit' >{loading ? <Spinner /> : "Criar board"}</Button>

            </Styled.ContentAdd>
        </Styled.ContainerToggle>
    )
}