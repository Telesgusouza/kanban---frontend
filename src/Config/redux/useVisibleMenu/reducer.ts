import ActionTypes from "../../ActionTypes";
import { IActionVisibleMenu, IVisibleMenu } from "../../interface";

const initialState: IVisibleMenu = {
    visible: false
}

const useVisibleMenu = (state: IVisibleMenu = initialState, action: IActionVisibleMenu) => {
    
    if (action.type === ActionTypes.visibleMenu) {
        return {...state, visible: action.payload}
    }
    
    return state;
}

export default useVisibleMenu;