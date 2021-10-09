import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./state";

import { reduxStore, updateReduxStore } from "./storage";

let initState = reduxStore();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    initState,
    composeEnhancer(applyMiddleware(thunk)),
);
store.subscribe(() => {
    updateReduxStore(store)
})

export default store;