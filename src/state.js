import { combineReducers } from "redux";
import {
    alertReducer, inventoryReducers, authReducer, customerReducers, vendorReducers, dashboardReducers,
    categoryReducer, siteReducer
} from "./Reducers";

const reducers = combineReducers({
    site: siteReducer,
    alerts: alertReducer,
    currentUser: authReducer,
    inventory: inventoryReducers,
    customers: customerReducers,
    vendors: vendorReducers,
    dashboard: dashboardReducers,
    categories: categoryReducer
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer