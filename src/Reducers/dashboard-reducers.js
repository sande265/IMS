import { dashboardConstants } from "../Constants";

let initState = {
    sales: {},
    salesReport: {},
    error: {},
    processing: true
}

export const dashboardReducers = (state = initState, action) => {
    switch (action.type) {
        // Sales Reducers
        case dashboardConstants.SALES_SUCCESS:
            return { ...state, sales: action.payload.data, processing: false, error: {} }
        case dashboardConstants.SALES_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, sales: {} }
        case dashboardConstants.SALES_PROCESSING:
            return { ...state, processing: true }

        case dashboardConstants.SALES_REPORT_SUCCESS:
            return { ...state, salesReport: action.payload.data, processing: false, error: {} }
        case dashboardConstants.SALES_REPORT_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, salesReport: {} }
        case dashboardConstants.SALES_REPORT_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}