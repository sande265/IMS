import { debtorConstants } from "../Constants";

let initState = {
    debtor: {},
    debtors: {},
    error: {},
    processing: true
}

export const debtorReducers = (state = initState, action) => {
    switch (action.type) {
        // customer Reducers
        case debtorConstants.SUCCESS:
            return { ...state, debtor: action.payload.data, processing: false, error: {} }
        case debtorConstants.ERROR:
            return { ...state, error: { data: action.payload }, processing: false, debtor: {} }
        case debtorConstants.PROCESSING:
            return { ...state, processing: true }

        // customers reducers

        case debtorConstants.FETCH_ALL_SUCCESS:
            return { ...state, debtors: action.payload.data, processing: false, error: {} }
        case debtorConstants.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, debtors: {} }
        case debtorConstants.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}