import axios from 'axios'
import {Alert, AsyncStorage} from 'react-native'

const GETFOLLOWING = 'GETFOLLOWING';

const initialState = {
    followingList: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case GETFOLLOWING:
            return Object.assign({}, state, {followingList: action.list});
        default:
            return state
    }
}

export function getList(user_id) {
    console.log('yoyo fired')
    return dispatch =>{
        axios.get('http://52.10.128.151:3005/api/getFollowing/' + user_id).then(result =>{
            console.log('yoyo',result.data)
            dispatch({
                type: GETFOLLOWING,
                list: result.data
            })
        })
    }
}