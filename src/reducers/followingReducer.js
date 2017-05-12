import axios from 'axios'

const GETFOLLOWING = 'GETFOLLOWING';
const GET_PROFILE_COUNT = `GET_PROFILE_COUNT`;
const GETHISTORY = 'GETHISTORY';
const NEXTROUTE = 'NEXTROUTE';
const PREVROUTE = 'PREVROUTE';

const initialState = {
    followingList: [],
    profileCount: {
        post_count:0,
        follower_count:0,
        following_count:0
    },
    passedHistory: {
        entries: [],
        location: {
            pathname: '/Home',
        },
    },
    id: 0,
    route: []
};

export default (state = initialState, action) => {
    switch (action.type){
        case GETFOLLOWING:
            return Object.assign({}, state, {followingList: action.list});
        case GETHISTORY:
            return Object.assign({}, state, {passedHistory: action.payload, id: action.id});
        case GET_PROFILE_COUNT:
            return Object.assign({}, state, {profileCount: action.payload});
        case NEXTROUTE:
            return Object.assign({}, state, {route: action.next});
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
export function passHistory(path,id){
    return {
            type: GETHISTORY,
            payload: path,
            id: id
        }
}
export function nextRoute(path){
    return {
        type
    }
}