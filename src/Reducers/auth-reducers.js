import { authConstants } from "../Constants"

let initState = {
    logged: {},
    me: {},
    error: {},
    processing: true
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstants.SUCCESS:
            return { ...state, logged: action.payload, processing: false, error: {} }
        case authConstants.ERROR:
            return { ...state, error: action.payload, processing: false, logged: {} }
        case authConstants.PROCESSING:
            return { ...state, processing: false }

        case authConstants.USER_SUCCESS:
            return { ...state, me: action.payload.data, processing: false, error: {} }
        case authConstants.USER_ERROR:
            return { ...state, error: action.payload, processing: false, me: {} }
        case authConstants.USER_PROCESSING:
            return { ...state, processing: false }

        default:
            return state
    }
}