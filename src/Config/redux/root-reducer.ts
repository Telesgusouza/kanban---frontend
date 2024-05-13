import { combineReducers } from 'redux';

import useTheme from './useTheme/reducer';
import useBoard from './useBoard/reducer';
import useVisibleMenu from './useVisibleMenu/reducer';
import useCard from './useCard/reducer';

const rootReducer = combineReducers({useTheme, useBoard, useVisibleMenu, useCard});

export default rootReducer;