import { success } from "../shared/axios"

export const toggleSidebar = (bool) => {
    return dispatch => {
        dispatch(success('TOGGLE_SIDEBAR_SUCCESS', bool))
    }
}
