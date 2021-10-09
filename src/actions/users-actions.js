import { api, failure, processing, success } from "../shared/axios";
import { userConstants } from "../Constants";

const getUser = (user, type) => {
    let url = `/${type}/${user}`
    return dispatch => {
        dispatch(processing(userConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(userConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(userConstants.ERROR, error))
                    return error
                }
            )
    }
}

const getUserRepos = (user, type) => {
    let url = (`/${type}/${user}/repos`)
    return dispatch => {
        dispatch(processing(userConstants.REPO_PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(userConstants.REPO_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(userConstants.REPO_ERROR, error))
                    return error
                }
            )
    }
}

export {
    getUser,
    getUserRepos
}