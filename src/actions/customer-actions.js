import { customerConstants } from '../Constants'
import { api, processing, success, failure } from '../shared/axios'
import { errorAlert } from './alert-actions'

const getAll = (attribute) => {
    attribute = attribute || {}
    let url = '/customers'
    return dispatch => {
        dispatch(processing(customerConstants.FETCH_ALL_PROCESSING));
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
                    dispatch(success(customerConstants.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(customerConstants.FETCH_ALL_ERROR, error))
                    if (error?.data?.message) dispatch(errorAlert(error.data.message))
                    return error
                }
            )
    }
}

const getCustomer = (id) => {
    let url = `/customer/${id}`
    return dispatch => {
        dispatch(processing(customerConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(customerConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(customerConstants.ERROR, error))
                    return error
                }
            )
    }
}

const removeCustomer = (id) => {
    let url = `/customer/${id}`
    return dispatch => {
        dispatch(processing(customerConstants.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(customerConstants.DELETE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(customerConstants.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

const editCustomer = (id, payload) => {
    let url = `/customer/${id}`
    return dispatch => {
        dispatch(processing(customerConstants.UPDATE_PROCESSING, true))
        return api.patch(url, payload)
            .then(
                response => {
                    dispatch(success(customerConstants.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(customerConstants.UPDATE_ERROR, error))
                    return error
                }
            )
    }
}

const newCustomer = (payload) => {
    let url = `/customers`
    return dispatch => {
        dispatch(processing(customerConstants.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(customerConstants.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(customerConstants.CREATE_ERROR, error))
                    return error
                }
            )
    }
}

export {
    getAll as getCustomers,
    getCustomer,
    editCustomer,
    removeCustomer,
    newCustomer
}