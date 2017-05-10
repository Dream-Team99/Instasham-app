import axios from 'axios'

const SENT_MESSAGE = 'chat/SENT_MESSAGE'
const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'
const CHATS_RECEIVED = 'chat/CHATS_RECEIVED'

const initialState = {
	chats: {}
}

export default (state = initialState, action) => {
	switch (action.type){
		case SENT_MESSAGE:
			return state
		case MESSAGES_RECEIVED:
			return Object.assign({}, state, {messages: action.messages})
		case CHATS_RECEIVED:
			return Object.assign({}, state, {chats: action.chats})
		default:
			return state
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

