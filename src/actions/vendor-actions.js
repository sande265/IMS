import { vendorConstants } from '../Constants'
import { api, processing, success, failure } from '../shared/axios'

export const getVendors = (attribute) => {
    attribute = attribute || {}
    let url = '/vendors'
    return dispatch => {
        dispatch(processing(vendorConstants.FETCH_ALL_PROCESSING, true));
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
                    dispatch(success(vendorConstants.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(vendorConstants.FETCH_ALL_ERROR, error))
                    return error
                }
            )
    }
}

export const getVendor = (id) => {
    let url = `/vendor/${id}`
    return dispatch => {
        dispatch(processing(vendorConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(vendorConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(vendorConstants.ERROR, error))
                    return error
                }
            )
    }
}

export const deleteVendor = (id) => {
    let url = `/vendor/${id}`
    return dispatch => {
        dispatch(processing(vendorConstants.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(vendorConstants.DELETE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(vendorConstants.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

export const editVendor = (id, payload) => {
    let url = `/vendor/${id}`
    return dispatch => {
        dispatch(processing(vendorConstants.UPDATE_PROCESSING, true))
        return api.patch(url, payload)
            .then(
                response => {
                    dispatch(success(vendorConstants.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(vendorConstants.UPDATE_ERROR, error))
                    return error
                }
            )
    }
}

export const createVendor = (payload) => {
    let url = `/vendors`
    return dispatch => {
        dispatch(processing(vendorConstants.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(vendorConstants.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(vendorConstants.CREATE_ERROR, error))
                    return error
                }
            )
    }
}