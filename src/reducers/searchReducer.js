/**
 * Created by beebe on 5/4/2017.
 */
import axios from 'axios';

const SEARCHPROFILE = 'SEARCHPROFILE';


const initialState = {
    SearchText: '',
    Profiles: [{}]
    };


export default (state = initialState, action) => {

    switch (action.type){
        case SEARCHPROFILE:
            return Object.assign({}, state, {SearchText: action.text, Profiles: action.Profiles.data});
        default:
            return state;
    }
}

export function searchForUsers(text) {
        return dispatch =>{
            axios.get(`http://52.10.128.151:3005/api/getUser?username=${text}`).then((res)=>{
                dispatch( {
                    type: SEARCHPROFILE,
                    Profiles: res,
                    text:text
                })
                })
        }

}
