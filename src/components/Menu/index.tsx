import * as Styled from './styled';

import logoImg from '../../assets/icons/logo-dark.svg';
import logoDarkImg from '../../assets/icons/logo-light.svg';

import boardImg from '../../assets/icons/icon-board.svg';
import boardLightImg from '../../assets/icons/icon-board-light.svg';
import boardPurpleImg from '../../assets/icons/icon-board-purple.svg';

import sunImg from "../../assets/icons/icon-light-theme.svg";
import darkImg from "../../assets/icons/icon-dark-theme.svg";

import noEyeImg from '../../assets/icons/icon-hide-sidebar.svg';
import eyeImg from '../../assets/icons/icon-show-sidebar.svg';
import closeImg from '../../assets/icons/icon-cross.svg';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../Config/ActionTypes';
import { IBoard, IRootReducer } from '../../Config/interface';

import themeJson from '../../assets/theme';
import axios from 'axios';
import base_url from '../../Config/BaseUrl';
import { toast } from 'react-toastify';
import AddBoard from '../AddBoard';
import EditBoard from '../EditBoard';
import SectionDelete from '../SectionDelete';


export default function Menu() {

    const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);
    const dispatch = useDispatch();

    const [board, setBoard] = useState<string>("");
    const [listBoard, setListBoard] = useState<IBoard[]>([]);
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);

    const [toggleAdd, setToggleAdd] = useState<boolean>(false);
    const [toggleEditBoard, setToggleEditBoard] = useState<boolean>(false);
    const [toggleDeleteBoard, setToggleDeleteBoard] = useState<boolean>(false);
    const [currentBoard, setCurrentBoard] = useState<IBoard>();

    useEffect(() => {

        async function getBoards() {
            const auth = localStorage.getItem("authentication");
            if (auth) {
                const token = JSON.parse(auth);

                const data = await axios.get(base_url + "/api/v1/boards", {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                }).catch((e) => {
                    toast.error("Error para achar o board");
                    console.error(e);
                })

                setListBoard(data?.data.board);

                setBoard(data?.data.board[0].name);

                dispatch({
                    type: ActionTypes.board,
                    payload: {board: data?.data ? data?.data.board[0] : {
                        id: "",
                        name: ""
                    }}
                });

            }

        }

        getBoards();

    }, [])

    async function handleBoard(boardValue: IBoard) {
        
        if (board === boardValue.name) {
            setToggleEditBoard(false);
            openEditBoard(boardValue); 
        } else {
            setToggleDeleteBoard(false);
            setBoard(boardValue.name);
            dispatch({
                type: ActionTypes.board,
                payload: {board: boardValue}
            });
        }


    }

    function handleTheme() {
        dispatch({
            type: ActionTypes.theme,
            payload: !theme,
        })
    }

    function closeBoard() {
        setToggleAdd(false);
        setToggleEditBoard(false);
        setToggleDeleteBoard(false);
        return null;
    }

    function openEditBoard(board: IBoard) {
        setCurrentBoard(board);
        setToggleEditBoard(true);
    }

    function deleteBoard() {
        setToggleEditBoard(false);
        setToggleDeleteBoard(true);
    }

    function handleVisibleMenu(toggle: boolean) {
        setToggleMenu(toggle);
        dispatch({
            type: ActionTypes.visibleMenu,
            payload: toggle
        });
    }

    return (
        <>
            {toggleAdd && (
                <Styled.ContainerToggle>
                    <Styled.ContainerButton>
                        <Styled.ImgClose> 
                            <img src={closeImg} alt="fechar" onClick={() => closeBoard()} />
                        </Styled.ImgClose>
                    </Styled.ContainerButton>
                    
                    <AddBoard closeBoard={() => closeBoard()} />

                </Styled.ContainerToggle>
            )}
        
            { toggleEditBoard && currentBoard && (
                <Styled.ContainerToggle>

                    <Styled.ContainerButton>
                        <Styled.ButtonClose onClick={deleteBoard} > apagar board </Styled.ButtonClose>
                    
                        <Styled.ImgClose> 
                            <img src={closeImg} alt="fechar" onClick={() => closeBoard()} />
                        </Styled.ImgClose>
                    
                    </Styled.ContainerButton>
                                
                    <EditBoard closeBoard={() => closeBoard()} board={currentBoard} />
            
                </Styled.ContainerToggle>
            )}

            {toggleDeleteBoard && currentBoard && (
                <Styled.ContainerToggle>
                    <Styled.ContainerButton>
                        <Styled.ImgClose> 
                            <img src={closeImg} alt="fechar" onClick={() => closeBoard()} />
                        </Styled.ImgClose>
                    </Styled.ContainerButton>

                    <SectionDelete closeBoard={() => closeBoard()} board={currentBoard} />
                </Styled.ContainerToggle>
            )}

            <Styled.Container>
                <Styled.ContentMenu theme={theme ? themeJson.white : themeJson.darkGray } togglemenu={toggleMenu ? "visible" : ""} >
                    <Styled.Content>

                        <Styled.Icone src={theme ? logoImg : logoDarkImg } alt="Icone" />

                        <strong>Todos boards ({listBoard.length})</strong>

                        <ul>
                            {listBoard.length > 0 && listBoard.map(resp => 
                                <Styled.Li key={resp.id} option={board == resp.name ? "select" : ""} onClick={() => handleBoard(resp)} >
                                    <img onClick={() => openEditBoard(resp)} src={board == resp.name ? boardLightImg : boardImg} alt='icone board' />
                                    {resp.name}
                                </Styled.Li>
                            )}
                        


                            <Styled.Li optionadd={"select"} onClick={() => setToggleAdd(true)}  >
                                <img src={boardPurpleImg} alt='icone board' /> + novo board
                            </Styled.Li>

                        </ul>
                    </Styled.Content>

                    <div style={{paddingLeft: 26}} >

                        <Styled.ContainerTheme theme={theme ? themeJson.lightGray : themeJson.veryDarkGray} >
                            <img src={sunImg} alt="icone de sol" />

                            <Styled.Theme onClick={handleTheme} theme={theme ? "3px" : "23px"} />
                            
                            <img src={darkImg} alt="icone de lua" />
                        </Styled.ContainerTheme>

                        <Styled.ContainerHidden onClick={() => handleVisibleMenu(true)} >
                            <img src={noEyeImg} alt="icone de olho" />
                            Esconder menu
                        </Styled.ContainerHidden>
                    
                    </div>
                </Styled.ContentMenu>

                <Styled.Visible togglemenu={!toggleMenu ? "visible" : ""} onClick={() => handleVisibleMenu(false)} >
                    <img src={eyeImg} alt="icone olho" />
                </Styled.Visible>

            </Styled.Container>
        </>
    )
}