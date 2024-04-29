import ActionTypes from "../../ActionTypes";
import { IActionBoard, IBoard } from "../../interface";

const initialState: {board: IBoard} = {
    board: {
        id: "",
        name: ""
    }
}

const useBoard = (state: {board: IBoard} = initialState, action: IActionBoard) => {
    
    if (action.type === ActionTypes.board) {
        return {...state, board: action.payload}
    }
    
    return state;
}

export default useBoard;