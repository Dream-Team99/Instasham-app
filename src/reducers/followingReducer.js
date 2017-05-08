import axios from 'axios'
import {Alert, AsyncStorage} from 'react-native'

const GETFOLLOWING = 'GETFOLLOWING';
const GET_PROFILE_COUNT = `GET_PROFILE_COUNT`;

const initialState = {
    followingList: [],
    profileCount: {}
};

export default (state = initialState, action) => {
    switch (action.type){
        case GETFOLLOWING:
            return Object.assign({}, state, {followingList: action.list});
        case GET_PROFILE_COUNT:
            return Object.assign({}, state, {profileCount: action.payload});
        default:
            return state
    }
}

export function getList(user_id) {
    return dispatch =>{
        axios.get('http://52.10.128.151:3005/api/getFollowing/' + user_id).then(result =>{
            dispatch({
                type: GETFOLLOWING,
                list: result.data
            })
        })
    }
}
export function followerCount(user_id){
    return dispatch =>{
        axios.get('http://52.10.128.151:3005/api/getFollowing/count/' + user_id).then(result =>{
            dispatch({
                type: GET_PROFILE_COUNT,
                payload: result.data
            })
        })
    }
}