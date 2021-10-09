import { authConstants } from "../Constants"

let initState = {
    me: {},
    error: {},
    processing: true
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstants.SUCCESS:
            return { ...state, me: action.payload.data, processing: false, error: {} }
        case authConstants.ERROR:
            return { ...state, error: action.payload, processing: false, me: {} }
        case authConstants.PROCESSING:
            return { ...state, processing: false }
        default:
            return state
    }
}