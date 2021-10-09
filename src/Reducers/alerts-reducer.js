import { alertConstants } from "../Constants"

let initState = {
    type: '',
    varient: ``,
    message: '',
    title: '',
    showSnackbar: false
}

export const alertReducer = (state = initState, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return { ...state, type: `success`, message: action.message, showSnackbar: true }
        case alertConstants.ERROR:
            return { ...state, type: `error`, message: action.message, showSnackbar: true }
        case alertConstants.CLEAR:
            return { ...state, type: ``, message: ``, title: ``, showSnackbar: false }
        case alertConstants.RESET:
            return {}
        default:
            return state
    }
}