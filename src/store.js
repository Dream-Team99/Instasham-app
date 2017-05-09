import {createStore, applyMiddleware, combineReducers} from 'redux';
import profileReducer from './reducers/profileReducer';
import searchReducer from "./reducers/searchReducer";
import followingReducer from './reducers/followingReducer';
import thunk from 'redux-thunk';

export default createStore(combineReducers({searchReducer,profileReducer,followingReducer}), {}, applyMiddleware(
	 thunk
))

