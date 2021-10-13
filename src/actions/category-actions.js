import { categoryConstants } from '../Constants'
import { api, processing, success, failure } from '../shared/axios'
import { errorAlert } from './alert-actions'

const getAll = (attribute) => {
    attribute = attribute || {}
    let url = '/categories'
    return dispatch => {
        dispatch(processing(categoryConstants.FETCH_ALL_PROCESSING, true));
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
                    dispatch(success(categoryConstants.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(categoryConstants.FETCH_ALL_ERROR, error))
                    if (error?.data?.message) dispatch(errorAlert(error.data.message))
                    return error
                }
            )
    }
}

const getCategory = (id) => {
    let url = `/category/${id}`
    return dispatch => {
        dispatch(processing(categoryConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(categoryConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(categoryConstants.ERROR, error))
                    return error
                }
            )
    }
}

const removeCategory = (id) => {
    let url = `/category/${id}`
    return dispatch => {
        dispatch(processing(categoryConstants.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(categoryConstants.DELETE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(categoryConstants.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

const editCategory = (id, payload) => {
    let url = `/category/${id}`
    return dispatch => {
        dispatch(processing(categoryConstants.UPDATE_PROCESSING, true))
        return api.patch(url, payload)
            .then(
                response => {
                    dispatch(success(categoryConstants.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(categoryConstants.UPDATE_ERROR, error))
                    return error
                }
            )
    }
}

const newCategory = (payload) => {
    let url = `/categories`
    return dispatch => {
        dispatch(processing(categoryConstants.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(categoryConstants.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(categoryConstants.CREATE_ERROR, error))
                    return error
                }
            )
    }
}

export {
    getAll as getCategories,
    getCategory,
    editCategory,
    removeCategory,
    newCategory
}