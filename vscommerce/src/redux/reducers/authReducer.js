import { AUTH_TOKEN } from '../actions/authActions';
const INITIAL_STATE = {
    loggedIn: false,
    isAdmin: false
}
export default function authReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case AUTH_TOKEN: {
            const payload = action.payload;
            console.log(payload)
            if(payload.message){
                return {
                    loggedIn: false,
                    isAdmin: false
                };
            }
            if (payload) {
                return {
                    loggedIn: true,
                    isAdmin: payload.isAdmin
                };
            }
            break;

        }

        default: { }
    }
    return state;
}

