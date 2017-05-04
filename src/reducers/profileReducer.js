import axios from 'axios';
import {Facebook} from 'expo';
import {Alert, AsyncStorage} from 'react-native';

const GETPROFILE = 'GETPROFILE';
const CHECKTOKEN = 'CHECKTOKEN';

const initialState = {profile: ''};

export default (state = initialState, action) => {
    switch (action.type){
        case GETPROFILE:
            console.log(action.profile)
            return Object.assign({}, state, {profile: action.profile});
        case CHECKTOKEN:
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
                        // console.log(profile)
                        await AsyncStorage.setItem('id', profile.id);
                        axios.post('http://52.10.128.151:3005/api/users', {profile: profile}).then(result=>{
                            // console.log(result)
                            dispatch( {
                                type: GETPROFILE,
                                profile: result.data
                            })
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
                AsyncStorage.getItem('id').then(response=> {
                    // console.log(response);
                    if (response) {
                        // console.log('token is',response);
                        axios.get('http://52.10.128.151:3005/api/getUser/' + response).then(function (result) {
                            // console.log(result)
                            if (result.status === 200) {
                                dispatch({
                                    type: CHECKTOKEN,
                                    profile: result.data
                                })
                            } else {
                                dispatch({
                                    type: '',
                                    profile: ''
                                })
                            }
                        })
                    } else{
                    console.log('no token')
                    }
                })

        })()
    }
}
