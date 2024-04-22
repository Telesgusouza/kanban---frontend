import ActionTypes from "../../ActionTypes";
import { IActionTheme, IState } from "../../interface";

const initialState: IState = {
    theme: false
}

const useTheme = (state: IState = initialState, action: IActionTheme) => {
    
    if (action.type === ActionTypes.theme) {
        return {...state, theme: action.payload}
    }
    
    return state;
}

export default useTheme;