import { vendorConstants } from "../Constants";

let initState = {
    vendor: {},
    vendors: {},
    error: {},
    processing: true
}

export const vendorReducers = (state = initState, action) => {
    switch (action.type) {
        // Inventory Reducers
        case vendorConstants.SUCCESS:
            return { ...state, vendor: action.payload.data, processing: false, error: {} }
        case vendorConstants.ERROR:
            return { ...state, error: { data: action.payload }, processing: false, vendor: {} }
        case vendorConstants.PROCESSING:
            return { ...state, processing: true }

        // inventories reducers

        case vendorConstants.FETCH_ALL_SUCCESS:
            return { ...state, vendors: action.payload.data, processing: false, error: {} }
        case vendorConstants.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, vendors: {} }
        case vendorConstants.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}