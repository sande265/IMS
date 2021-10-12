import { api, failure, processing, success } from "../shared/axios"
import { errorAlert, successAlert } from "./alert-actions"

export const sellItem = (id, data) => {
    let url = `/sell/${id}`
    return dispatch => {
        dispatch(processing('SELL_ITEM_PROCESING', true))
        return api.post(url, data)
            .then(
                response => {
                    dispatch(success('SELL_ITEM_SUCCESS', response))
                    if (response?.status === 200) dispatch(successAlert(response?.data?.message))
                    return response
                },
                error => {
                    dispatch(failure('SELL_ITEM_ERROR', error))
                    if (error && error.status === 400) dispatch(errorAlert(error?.data?.message))
                    return error
                }
            )
    }
}