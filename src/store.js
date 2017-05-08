import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import profileReducer from './reducers/profileReducer';
import searchReducer from "./reducers/searchReducer";
import followingReducer from './reducers/followingReducer';
import thunk from 'redux-thunk';

export default createStore(combineReducers({searchReducer,profileReducer,followingReducer}), {}, applyMiddleware(
    promiseMiddleware(), thunk
))

