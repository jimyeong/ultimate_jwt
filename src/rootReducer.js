import { combineReducers } from 'redux';
import { systemReducer } from './features';

const rootReducer = combineReducers({
  system: systemReducer,
});

export default rootReducer;
