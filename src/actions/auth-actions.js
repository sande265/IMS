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

export {
    Login as loginUser
}
