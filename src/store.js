import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import rootReducer from './rootReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(ThunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

export default store;
