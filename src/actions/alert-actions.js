import { alertConstants } from "../Constants";

function success(message, data = null) {
    return { type: alertConstants.SUCCESS, message, data };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

function reset() {
    return { type: alertConstants.RESET };
}

export {
    success as successAlert,
    error as errorAlert,
    clear as clearAlerts,
    reset as resetAlert
}