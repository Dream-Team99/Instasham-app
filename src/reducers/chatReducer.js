import axios from 'axios';

const MESSAGE_SENT = 'chat/MESSAGE_SENT';
const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED';
const LOADING_MESSAGES = 'chat/LOADING_MESSAGES';
const SEARCH_TEXT_HANDLER = 'chat/SEARCH_TEXT_HANDLER';
const LOADING_SEARCH = 'chat/LOADING_SEARCH';
const SEARCH_RETURNED = 'chat/SEARCH_RETURNED';

const initialState = {
	messages: {},
	search: '',
	searchResults: []
};

export default (state = initialState, action) => {
	switch (action.type){
		case SEARCH_TEXT_HANDLER:
			return Object.assign({}, state, {search: action.search});
		case LOADING_SEARCH:
			return Object.assign({}, state, {searchResults: []});
		case SEARCH_RETURNED:
			return Object.assign({}, state, {searchResults: action.results});
		case MESSAGES_RECEIVED:
			return Object.assign({}, state, {messages: action.messages});
		default:
			return state
	}
}

export function searchHandle(userid, search){
	return dispatch => {
		dispatch({
			type: SEARCH_TEXT_HANDLER,
			search: search
		});
		if(search.length>1){
			dispatch({type: LOADING_SEARCH});
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

export function sendMessage(senderid, receiverid, message){
	return dispatch => {
		axios.post('http://52.10.128.151:3005/api/chat', {senderid, receiverid, message}).then(()=>{
			dispatch({
				type: MESSAGE_SENT
			})
		})
	}
}

export function getMessages(userid){
	return dispatch => {
		dispatch({type: LOADING_MESSAGES});
		axios.get(`http://52.10.128.151:3005/api/chat/${userid}`).then(response => {
			for(var prop in response.data){
				response.data[prop] = response.data[prop].sort((a, b) => {
					return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1
				})
			}
			dispatch({
				type: MESSAGES_RECEIVED,
				messages: response.data
			})
		})
	}
}