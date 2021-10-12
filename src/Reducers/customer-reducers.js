import { customerConstants } from "../Constants";

let initState = {
    customer: {},
    customers: {},
    error: {},
    processing: true
}

export const customerReducers = (state = initState, action) => {
    switch (action.type) {
        // customer Reducers
        case customerConstants.SUCCESS:
            return { ...state, customer: action.payload.data, processing: false }
        case customerConstants.ERROR:
            return { ...state, error: { data: action.payload }, processing: false }
        case customerConstants.PROCESSING:
            return { ...state, processing: true }

        // customers reducers

        case customerConstants.FETCH_ALL_SUCCESS:
            return { ...state, customers: action.payload.data, processing: false }
        case customerConstants.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false }
        case customerConstants.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}