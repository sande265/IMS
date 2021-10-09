import { categoryConstants } from "../Constants";

let initState = {
    category: {},
    categories: {},
    error: {},
    processing: true
}

export const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        // Category Reducers
        case categoryConstants.SUCCESS:
            return { ...state, category: action.payload.data, processing: false, error: {} }
        case categoryConstants.ERROR:
            return { ...state, error: { data: action.payload }, processing: false, category: {} }
        case categoryConstants.PROCESSING:
            return { ...state, processing: true }

        // Categories reducers

        case categoryConstants.FETCH_ALL_SUCCESS:
            return { ...state, categories: action.payload.data, processing: false, error: {} }
        case categoryConstants.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, categories: {} }
        case categoryConstants.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}