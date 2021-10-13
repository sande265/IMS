let initState = {
    collapsed: false
}

export const siteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_SUCCESS':
            return { ...state, collapsed: action.payload }
        default:
            return state
    }
}