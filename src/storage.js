// const persistedState = localStorage.getItem('ReduxStr')
export const reduxStore = () => {
    let initState = {}
    // if (persistedState) {
    //     initState = JSON.parse(persistedState)
    // }
    return initState
}

export const updateReduxStore = (store) => {
    localStorage.setItem('ReduxStr', JSON.stringify(store.getState()))
}
