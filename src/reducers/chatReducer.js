import axios from 'axios'

const SENT_MESSAGE = 'chat/SENT_MESSAGE'
const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'
const CHATS_RECEIVED = 'chat/CHATS_RECEIVED'
const SEARCH_HANDLER = 'chat/SEARCH_HANDLER'
const LOADING_SEARCH = 'chat/LOADING_SEARCH'
const SEARCH_RETURNED = 'chat/SEARCH_RETURNED'

const initialState = {
	chats: {},
	search: '',
	searchResults: [],
	loading: false
}

export default (state = initialState, action) => {
	switch (action.type){
		case SEARCH_HANDLER:
			return Object.assign({}, state, {search: action.search})
		case LOADING_SEARCH:
			return Object.assign({}, state, {
				searchResults: [], 
				loading: true
			})
		case SEARCH_RETURNED:
			return Object.assign({}, state, {searchResults: action.results})
		default:
			return state
	}
}

export function searchHandle(userid, search){
	return dispatch => {
		dispatch({
			type: SEARCH_HANDLER,
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

export function getChats(userId){
	return dispatch => {
		axios.get(`/chat/chats/${userId}`).then(response => {
			dispatch({
				type: CHATS_RECEIVED,
				chats: response.data
			})
		})
	}
}

