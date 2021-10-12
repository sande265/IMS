import { dashboardConstants } from "../Constants"
import { api, failure, processing, success } from "../shared/axios"
import { errorAlert } from "./alert-actions"

export const getDailySales = (date) => {
    let url = `/sales?date=${date}`
    return dispatch => {
        dispatch(processing(dashboardConstants.SALES_PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(dashboardConstants.SALES_SUCCESS, response))
                },
                error => {
                    dispatch(failure(dashboardConstants.SALES_ERROR, error))
                }
            )
    }
}

export const getSalesReport = (attribute) => {
    let url = "/sales-report";
    return dispatch => {
        dispatch(processing(dashboardConstants.SALES_REPORT_PROCESSING, true));
        let params = {
            limit: attribute.limit || 10,
            page: attribute.page || 1,
            q: attribute.q || ``,
            sort_field: attribute.sort_field || `id`,
            sort_by: attribute.sort_by || 'desc'
        }
        attribute.filter && attribute.filter.map(item => {
            if (item.value) {
                params[`[${item.key}]`] = item.value
            }
        })
        let config = {
            params
        }
        return api.get(url, config)
            .then(
                response => {
                    dispatch(success(dashboardConstants.SALES_REPORT_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(dashboardConstants.SALES_REPORT_ERROR, error))
                    if (error?.status === 400)
                        dispatch(errorAlert(error.data && error.data.message ? error.data.message : "Something Went Wrong"))
                    return error
                }
            )
    }
}