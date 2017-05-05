import {createStore, applyMiddleware, combineReducers} from 'redux'
import profileReducer from './reducers/profileReducer'
import searchReducer from './reducers/searchReducer'
import thunk from 'redux-thunk'

export default createStore(
	combineReducers({searchReducer, profileReducer}), 
	applyMiddleware(thunk)
)
