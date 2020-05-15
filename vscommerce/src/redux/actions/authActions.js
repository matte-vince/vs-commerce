import {} from 'react-redux'

export const AUTH_TOKEN = 'AUTH_TOKEN'
/* export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE' */

/* export function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
} */

export function authToken(result) {
    return {
        type: AUTH_TOKEN,
        payload:result
    }
}

/* export function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
} */