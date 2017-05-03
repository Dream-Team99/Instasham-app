import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import profileReducer from './reducers/profileReducer';
import thunk from 'redux-thunk';

export default createStore(profileReducer, {}, applyMiddleware(
    promiseMiddleware(), thunk
))
