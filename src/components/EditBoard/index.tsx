import { FC, useEffect, useState } from 'react';
import * as Styled from './styled';
import { IBoard, IRootReducer } from '../../Config/interface';
import Input from '../Input';
import OptionLi from '../OptionLi';

import closeImg from '../../assets/icons/icon-cross.svg';
import Button from '../Button';
import axios from 'axios';
import base_url from '../../Config/BaseUrl';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import themeJson from '../../assets/theme';
import Spinner from '../Spinner';
import ActionTypes from '../../Config/ActionTypes';

interface IProps {
    closeBoard: FC,
    board: IBoard,
}

interface IColumn {
    name: string;
    cor: string;
    id?: string;
}

export default function EditBoard({ closeBoard, board }: IProps) {

    const [nameBoard, setNameBoard] = useState(board.name);

    const [listColumns, setListColumns] = useState<IColumn[]>([]);
    
    const [nameColumn, setNameColumn] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getColumns() {
            
            const auth = localStorage.getItem("authentication");

            if (auth) {
                const token = JSON.parse(auth);
                
                const data = await axios.get(`${base_url}/api/v1/columns/${board.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                })

                setListColumns(data.data.columns);
            }

            
        }

        getColumns();

    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        const auth = localStorage.getItem("authentication");

        if (auth) {
            const token = JSON.parse(auth);

            if (nameBoard.trim() !== board.name.trim() && nameBoard.trim().length > 0) {
                
                await axios.patch(`https://kanban1-af8ee849af7e.herokuapp.com/api/v1/boards/${board.id}`, {name: nameBoard} ,{
                    headers:{
                        'Authorization': `Bearer ${token.token}`,
                        'Content-Type': 'application/json'
                    }
                }).catch(e => {
                    console.error(e);
                    toast.error("Error ao atualizar board")
                    setLoading(false);
                })

                toast.success("Board atualizado com sucesso");
                
            }
                    
            for (let i = 0; i <= listColumns.length-1; i++) {
                        
                if (!listColumns[i].id) {
                    await axios.post(base_url + "/api/v1/columns/" + board.id, {name: listColumns[i].name, cor: "#d3d3d3"},{
                        headers: {
                            'Authorization': `Bearer ${token.token}`
                        }
                    }).catch((e) => {
                            console.error("Error > ", e);
                            setLoading(false);
                    });
                }
            }

            dispatch({
                type: ActionTypes.board,
                payload: {board: board}
            });
            
        }

        setLoading(false);
        toast.success("Atualizado com sucesso");
        closeBoard({});
    }

    function handleAddList() {
        if (nameColumn.trim().length) {
            const list: IColumn[] = [...listColumns];
            const data: IColumn = {
                cor: "",
                name: nameColumn
            }
            list.push(data);

            setListColumns(list);
            setNameColumn("");
        }

    }

    async function handleDeleteOptionColumn(index: number, id?: string) {
        const list: IColumn[] = [...listColumns];
        list.splice(index, 1);
        
        setListColumns(list);

        if (id) {
            const auth = localStorage.getItem("authentication");

                if (auth) {
                    const token = JSON.parse(auth);

                await axios.delete(base_url + "/api/v1/columns/"+id, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                })
                .then(() => {
                    toast.success("Coluna apagada com sucesso")
                })
                .catch((e) => {
                    console.error("Error > ", e);
                    toast.error("Erro ao apagar coluna");
                });
            }
        }
    }

    return (
        <Styled.Container onSubmit={handleSubmit} clspan={theme ? themeJson.mediumGray : themeJson.white} cl={theme ? themeJson.black : themeJson.white} bg={theme ? themeJson.white : themeJson.darkGray } >
            <strong>Edite o Board</strong>

            <label htmlFor="name">
                <span>Nome Board</span>
                <Input type="text" placeholder='Edite o nome' value={nameBoard} onChange={e => setNameBoard(e.target.value)} />
            </label>

            {listColumns.length > 0 && (
                <>
                
                <span>Board Colunas</span>

                <ul>
                    
                    {listColumns.map((resp, index) => (
                        <li key={resp.name} >
                            <OptionLi>
                            {resp.name}
                            </OptionLi>
                            <img src={closeImg} alt="" onClick={() => handleDeleteOptionColumn(index, resp.id)} />
                        </li>                        
                    ))}

                    
                </ul>
                </>
            )}

            <label htmlFor="name">
                <span>Adicionar Coluna</span>
                <Input type="text" value={nameColumn} onChange={e => setNameColumn(e.target.value)} placeholder='Adicionar coluna' />
            </label>
            
            <Button type='button' onClick={handleAddList} light mg={24} >+Add nova coluna</Button>
            <Button type='submit' >
                {loading ? <Spinner /> : "Salvar alterações" }
            </Button>



        </Styled.Container>
    )
}
