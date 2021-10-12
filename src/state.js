import { combineReducers } from "redux";
import {
    alertReducer, userReducer, inventoryReducers, authReducer, customerReducers, vendorReducers, dashboardReducers,
    categoryReducer
} from "./Reducers";

const reducers = combineReducers({
    alerts: alertReducer,
    currentUser: authReducer,
    user: userReducer,
    inventory: inventoryReducers,
    customers: customerReducers,
    vendors: vendorReducers,
    dashboard: dashboardReducers,
    categories: categoryReducer
})

const rootReducer = (state, action) => {
    console.log("state", state);
    console.log("actions", action);
    return reducers(state, action)
}

export default rootReducer