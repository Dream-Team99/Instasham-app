const SHOW_CHAT = 'modal/SHOW_CHAT'
const SHOW_SEARCH = 'modal/SHOW_SEARCH'
const HIDE_SEARCH = 'modal/HIDE_SEARCH'
const HIDE_CHAT = 'modal/HIDE_CHAT'

const initialState = {
	showSearch: false,
	showChat: false,
	chatid: null
}

export default (state = initialState, action) => {
	switch (action.type){
		case SHOW_CHAT:
			return Object.assign({}, state, {showChat: true, showSearch: false, chatid: action.id})
		case SHOW_SEARCH:
			return Object.assign({}, state, {showSearch: true})
		case HIDE_SEARCH:
			return Object.assign({}, state, {showSearch: false})
		case HIDE_CHAT:
			return Object.assign({}, state, {showChat: false})
		default:
			return state
	}
}

export function showChat(id){
	return {
		type: SHOW_CHAT,
		id
	}
}

export function showSearch(){
	return {
		type: SHOW_SEARCH
	}
}

export function hideSearch(){
	return {
		type: HIDE_SEARCH
	}
}

export function hideChat(){
	return {
		type: HIDE_CHAT
	}
}