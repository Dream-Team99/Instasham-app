import {createStore, applyMiddleware, combineReducers} from 'redux';
import profileReducer from './reducers/profileReducer';
import searchReducer from "./reducers/searchReducer";
import followingReducer from './reducers/followingReducer';
import chatReducer from './reducers/chatReducer'
import thunk from 'redux-thunk';

export default createStore(combineReducers({
	searchReducer,
	profileReducer,
	followingReducer,
	chatReducer
}), applyMiddleware(
	thunk

))

