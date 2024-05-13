import ActionTypes from "../../ActionTypes";
import { IActionCardTask,  ICardTask } from "../../interface";

const initialState: ICardTask = {
    card: "void" 
}

const useCard = (state: ICardTask = initialState, action: IActionCardTask) => {
    
    if (action.type === ActionTypes.card) {
        return {...state, card: action.payload}
    }
    
    return state;
}

export default useCard;