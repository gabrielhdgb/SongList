import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import tracksReducer from './reducers';

//Definição da const para combinar os reducers
const rootReducer = combineReducers({tracksReducer});

//Definindo a store centralizadora de todos estados da aplicação
export const store = createStore(rootReducer, applyMiddleware(thunk));