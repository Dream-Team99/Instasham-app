import axios from 'axios';
import {Facebook} from 'expo';
import {Alert, AsyncStorage} from 'react-native';

const GETPROFILE = 'GETPROFILE';
const CHECKTOKEN = 'CHECKTOKEN';

const initialState = {profile: ''};

export default (state = initialState, action) => {
    switch (action.type){
        case GETPROFILE:
            return Object.assign({}, state, {profile: action.profile});
        case CHECKTOKEN:
            // console.log(action.profile)
            return Object.assign({}, state, {profile: action.profile});
        default:
            return state;
    }
}

export function getProfile() {
    return dispatch =>{
        (_handleFacebookLogin = async () => {
            try {
                const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                    '1201211719949057', // Replace with your own app id in standalone app
                    { permissions: ['public_profile'] }
                );

                switch (type) {
                    case 'success': {
                        // Get the user's name using Facebook's Graph API
                        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`);
                        const profile = await response.json();
                        console.log('storing token ' + token);
                        await AsyncStorage.setItem('token', token);
                        dispatch( {
                            type: GETPROFILE,
                            profile: profile
                        })
                    }
                    case 'cancel': {
                        break;
                    }
                    default: {
                    }
                }
            } catch (e) {

            }
        })()
    }
}

export function checkToken() {
    return dispatch =>{
        (_check = async () => {
                AsyncStorage.getItem('token').then(response=>{
                console.log(response);
                if (response){
                    console.log('token is',response);
                    axios.get('https://graph.facebook.com/me?fields=id,name,picture&access_token=' + response).then(function (res) {
                        // console.log(res)
                        if(res.status === 200) {
                            dispatch({
                                type: CHECKTOKEN,
                                profile: res.data
                            })
                        }else{
                            dispatch({
                                type: '',
                                profile: ''
                            })
                        }
                    })
                }else{
                    console.log('no token')
                }
            })
        })()
    }
}
