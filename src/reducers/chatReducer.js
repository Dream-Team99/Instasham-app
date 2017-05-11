import axios from 'axios'

const SENT_MESSAGE = 'chat/SENT_MESSAGE'
const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'
const LOADING_MESSAGES = 'chat/LOADING_MESSAGES'
const SEARCH_TEXT_HANDLER = 'chat/SEARCH_TEXT_HANDLER'
const LOADING_SEARCH = 'chat/LOADING_SEARCH'
const SEARCH_RETURNED = 'chat/SEARCH_RETURNED'

const initialState = {
	messages: {},
	search: '',
	searchResults: [],
	loading: false
}

export default (state = initialState, action) => {
	switch (action.type){
		case SEARCH_TEXT_HANDLER:
			return Object.assign({}, state, {search: action.search})
		case LOADING_SEARCH:
			return Object.assign({}, state, {
				searchResults: [], 
				loading: true
			})
		case SEARCH_RETURNED:
			return Object.assign({}, state, {searchResults: action.results})
		case MESSAGES_RECEIVED:
			return Object.assign({}, state, {messages: action.messages})
		default:
			return state
	}
}

export function searchHandle(userid, search){
	return dispatch => {
		dispatch({
			type: SEARCH_TEXT_HANDLER,
			search: search
		})
		if(search.length>2){
			dispatch({type: LOADING_SEARCH})
			axios.get(`http://52.10.128.151:3005/api/chat/search/${userid}/${search}`).then(results => {
				dispatch({
					type: SEARCH_RETURNED,
					results: results.data
				})
			})
		} else {
			dispatch({
				type: SEARCH_RETURNED,
				results: []
			})
		}
	}
}

export function newMessage(sender, receiver, message){
	return dispatch => {
		axios.post('/chat/message', {sender, receiver, message}).then(()=>{
			dispatch({
				type: SENT_MESSAGE
			})
		})
	}
}

export function getMessages(userid){
	return dispatch => {
		dispatch({type: LOADING_MESSAGES})
		axios.get(`http://52.10.128.151:3005/api/chat/${userid}`).then(response => {
			dispatch({
				type: MESSAGES_RECEIVED,
				messages: response.data
			})
		})
	}
}

