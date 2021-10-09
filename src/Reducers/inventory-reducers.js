import { inventoryConstant } from "../Constants/inventory-constants";

let initState = {
    inventory: {},
    inventories: {},
    error: {},
    processing: true
}

export const inventoryReducers = (state = initState, action) => {
    switch (action.type) {
        // Inventory Reducers
        case inventoryConstant.SUCCESS:
            return { ...state, inventory: action.payload.data, processing: false, error: {} }
        case inventoryConstant.ERROR:
            return { ...state, error: { data: action.payload }, processing: false, inventory: {} }
        case inventoryConstant.PROCESSING:
            return { ...state, processing: true }

        // inventories reducers

        case inventoryConstant.FETCH_ALL_SUCCESS:
            return { ...state, inventories: action.payload.data, processing: false, error: {} }
        case inventoryConstant.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, inventories: {} }
        case inventoryConstant.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        default:
            return state
    }
}