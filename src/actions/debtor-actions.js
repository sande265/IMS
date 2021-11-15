import { debtorConstants } from '../Constants'
import { api, processing, success, failure } from '../shared/axios'
import { errorAlert } from './alert-actions'

export const getAllDebtors = (attribute) => {
    attribute = attribute || {}
    let url = '/debtors'
    return dispatch => {
        dispatch(processing(debtorConstants.FETCH_ALL_PROCESSING));
        let params = {
            limit: attribute.limit || 10,
            page: attribute.page || 1,
            q: attribute.q || ``,
            sort_field: attribute.sort_field || `id`,
            sort_by: attribute.sort_by || 'desc'
        }
        attribute.filter && Object.keys(attribute.filter).forEach(i => {
            let item = attribute.filter[i]
            params[`filter[${i}]`] = item
        })
        let config = {
            params
        };
        return api.get(url, config)
            .then(
                response => {
                    dispatch(success(debtorConstants.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(debtorConstants.FETCH_ALL_ERROR, error))
                    if (error?.data?.message) dispatch(errorAlert(error.data.message))
                    return error
                }
            )
    }
}

export const getDebtor = (id) => {
    let url = `/debtor/${id}`
    return dispatch => {
        dispatch(processing(debtorConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(debtorConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(debtorConstants.ERROR, error))
                    return error
                }
            )
    }
}

export const deleteDebtor = (id) => {
    let url = `/debtor/${id}`
    return dispatch => {
        dispatch(processing(debtorConstants.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(debtorConstants.DELETE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(debtorConstants.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

export const editDebtor = (id, payload) => {
    let url = `/debtor/${id}`
    return dispatch => {
        dispatch(processing(debtorConstants.UPDATE_PROCESSING, true))
        return api.patch(url, payload)
            .then(
                response => {
                    dispatch(success(debtorConstants.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(debtorConstants.UPDATE_ERROR, error))
                    return error
                }
            )
    }
}

export const newDebtor = (payload) => {
    let url = `/debtors`
    return dispatch => {
        dispatch(processing(debtorConstants.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(debtorConstants.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(debtorConstants.CREATE_ERROR, error))
                    return error
                }
            )
    }
}