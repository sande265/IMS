import jwtDecode from "jwt-decode";
import { api, success, processing, failure } from "../shared/axios"
import { authConstants } from '../Constants';
import { errorAlert } from "./alert-actions";

const Login = (payload) => {
    let url = `/login`
    return dispatch => {
        dispatch(processing(authConstants.PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    let decoded = jwtDecode(response.data && response.data.token)
                    localStorage.setItem('_Bearer', response.data && response.data.token)
                    dispatch(success(authConstants.SUCCESS, decoded))
                    return response
                },
                error => {
                    dispatch(failure(authConstants.ERROR, error));
                    dispatch(errorAlert(error && error.data?.message));
                    return error
                }
            )
    }
}

const getLoggedUser = (id) => {
    let url = `/me`
    return dispatch => {
        dispatch(processing(authConstants.USER_PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(authConstants.USER_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(authConstants.USER_ERROR, error))
                    if (error?.data?.message) dispatch(errorAlert(error.data.message))
                    return error
                }
            )
    }
}

const updateUser = (id, data) => {
    let url = `/users/${id}`;
    return dispatch => {
        dispatch(processing('UPDATE_USER_PROCESSING', true))
        return api.patch(url, data)
            .then(
                response => {
                    dispatch(success('UPDATE_USER_SUCCESS', response))
                    return response
                },
                error => {
                    dispatch(failure('UPDATE_USER_ERROR', error))
                    return error
                }
            )
    }
}

export {
    Login as loginUser,
    getLoggedUser,
    updateUser
}
