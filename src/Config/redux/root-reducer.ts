import { combineReducers } from 'redux';

import useTheme from './useTheme/reducer';
import useBoard from './useBoard/reducer';
import useVisibleMenu from './useVisibleMenu/reducer';

const rootReducer = combineReducers({useTheme, useBoard, useVisibleMenu});

export default rootReducer;