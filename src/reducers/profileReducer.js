import axios from 'axios'
import {Facebook} from 'expo'
import {Alert, AsyncStorage} from 'react-native'

const SETPROFILE = 'login/SETPROFILE'
const LOADING = 'login/LOADING'
const DONE_LOADING = 'login/DONE_LOADING'

const initialState = {
	profile: '',
	loading: false
}

export default (state = initialState, action) => {
	switch (action.type){
		case SETPROFILE:
			return Object.assign({}, state, {profile: action.profile, loading: false})
		case LOADING:
			return Object.assign({}, state, {loading: true})
		case DONE_LOADING:
			return Object.assign({}, state, {loading: false})
		default:
			return state
	}
}

export function login() {
	return dispatch => {
		// Login to FB and get token
		Facebook.logInWithReadPermissionsAsync(
			'1025828367561659', // app id
			{ permissions: ['public_profile'] }
		).then(response => {
			if(response.type==='success'){
				// Save token and use it to get facebook profile
				AsyncStorage.setItem('token', response.token)
				axios.get(`https://graph.facebook.com/me?fields=id,name,picture.height(720)&access_token=${response.token}`)
				.then(response => {
					// Find or create user in our DB
					axios.post('http://52.10.128.151:3005/api/users', {profile: response.data}).then(response=>{
						dispatch({
							type: SETPROFILE,
							profile: response.data
						})
					})
				})
			} else {
				Alert.alert('Login unsuccessful!')
			}
		})
	}
}

export function checkToken() {
	return dispatch => {
		dispatch({type: LOADING})
		AsyncStorage.getItem('token').then(token => {
			if(token){
				// Use token to get facebook profile
				axios.get(`https://graph.facebook.com/me?fields=id,name,picture.height(720)&access_token=${token}`)
				.then(response => {
					// Find or create user in our DB
					axios.post('http://52.10.128.151:3005/api/users', {profile: response.data})
					.then(response => {
						dispatch({
							type: SETPROFILE,
							profile: response.data
						})
					})
				})
			}	else {
				dispatch({type: DONE_LOADING})
			}
		})
	}
}
