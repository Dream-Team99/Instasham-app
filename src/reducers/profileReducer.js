import axios from 'axios';
import {Facebook} from 'expo';

const GETPROFILE = 'GETPROFILE';

const initialState = {profile: ''};

export default (state = initialState, action) => {
    switch (action.type){
        case GETPROFILE:
            return Object.assign({}, state, {profile: action.profile})
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
                        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`)
                        const profile = await response.json();
                        dispatch( {
                            type: GETPROFILE,
                            profile: profile
                        })
                    }
                    case 'cancel': {
                        // Alert.alert(
                        //     'Cancelled!',
                        //     'Login was cancelled!',
                        // );
                        break;
                    }
                    default: {
                        // Alert.alert(
                        //     'Oops!',
                        //     'Login failed!',
                        // );
                    }
                }
            } catch (e) {
                // Alert.alert(
                //     'Oops!',
                //     'Login failed!',
                // );
            }
        })()
    }

}

