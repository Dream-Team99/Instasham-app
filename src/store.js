import {createStore, applyMiddleware, combineReducers} from 'redux';
import profileReducer from './reducers/profileReducer';
import searchReducer from "./reducers/searchReducer";
import followingReducer from './reducers/followingReducer';
import chatReducer from './reducers/chatReducer'
import modalDuck from './reducers/modalDuck'
import thunk from 'redux-thunk';

export default createStore(combineReducers({
	searchReducer,
	profileReducer,
	followingReducer,
	chatReducer,
	modalDuck
}), applyMiddleware(
	thunk

))

