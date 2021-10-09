import { inventoryConstant } from '../Constants/inventory-constants'
import { api, processing, success, failure } from '../shared/axios'
import { successAlert } from './alert-actions'

const getAll = (attribute) => {
    attribute = attribute || {}
    let url = '/products'
    return dispatch => {
        dispatch(processing(inventoryConstant.FETCH_ALL_PROCESSING, true));
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
                    dispatch(success(inventoryConstant.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(inventoryConstant.FETCH_ALL_ERROR, error))
                    return error
                }
            )
    }
}

const getInventory = (id) => {
    let url = `/product/${id}`
    return dispatch => {
        dispatch(processing(inventoryConstant.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(inventoryConstant.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(inventoryConstant.ERROR, error))
                    return error
                }
            )
    }
}

const deleteInventory = (id) => {
    let url = `/product/${id}`
    return dispatch => {
        dispatch(processing(inventoryConstant.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(inventoryConstant.DELETE_SUCCESS, response))
                    dispatch(successAlert(response?.data.message))
                    return response
                },
                error => {
                    dispatch(failure(inventoryConstant.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

const editInventory = (id, payload) => {
    let url = `/product/${id}`
    return dispatch => {
        dispatch(processing(inventoryConstant.UPDATE_PROCESSING, true))
        return api.patch(url, payload)
            .then(
                response => {
                    dispatch(success(inventoryConstant.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(inventoryConstant.UPDATE_ERROR, error))
                    return error
                }
            )
    }
}

const createInventory = (payload) => {
    let url = `/products`
    return dispatch => {
        dispatch(processing(inventoryConstant.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(inventoryConstant.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(inventoryConstant.CREATE_ERROR, error))
                    return error
                }
            )
    }
}

export {
    getAll as getInventories,
    getInventory,
    editInventory,
    deleteInventory,
    createInventory
}