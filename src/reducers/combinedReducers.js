import { combineReducers } from 'redux';
import scoreReducer from './scoreReducer';

export const combinedReducers = combineReducers({
  scoreReducer
});

export default combineReducers;
