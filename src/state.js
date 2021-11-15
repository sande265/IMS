import { combineReducers } from "redux";
import {
    alertReducer, inventoryReducers, authReducer, customerReducers, vendorReducers, dashboardReducers,
    categoryReducer, siteReducer, debtorReducers
} from "./Reducers";

const reducers = combineReducers({
    site: siteReducer,
    alerts: alertReducer,
    currentUser: authReducer,
    inventory: inventoryReducers,
    customers: customerReducers,
    vendors: vendorReducers,
    dashboard: dashboardReducers,
    categories: categoryReducer,
    debtors: debtorReducers,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer