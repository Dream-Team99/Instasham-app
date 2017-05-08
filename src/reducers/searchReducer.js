import axios from 'axios';

const SEARCHPROFILE = 'SEARCHPROFILE';
const TEXT_ENTERED = `TEXT_ENTERED`;

const initialState = {
    SearchText: '',
    Profiles: []
    };


export default (state = initialState, action) => {

    switch (action.type){
        case SEARCHPROFILE:
            return Object.assign({}, state, {Profiles: action.Profiles.data});
        case TEXT_ENTERED:
            return Object.assign({}, state, {SearchText: action.text})
        default:
            return state;
    }
}

export function searchForUsers(text) {

        return dispatch =>{
            dispatch({
                type: TEXT_ENTERED,
                text:text
            });
            axios.get(`http://52.10.128.151:3005/api/getUser?username=${text}`).then((res)=>{
                dispatch( {
                    type: SEARCHPROFILE,
                    Profiles: res,
                })
                })
        }

}
