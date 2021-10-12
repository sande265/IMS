import { createBrowserHistory } from 'history';
import isEmpty from 'is-empty';
import jwt_decode from "jwt-decode";

export const ucFirst = (string) => {
    if (string && string.length > 0)
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export function capitalString(string) {
    let array = string && typeof string === 'string' ? string.split("_") : []
    if (typeof string === 'object')
        Object.keys(string).map(key => {
            array.push(Array.isArray(string[key]) ? string[key].join('. ') : string[key])
        })
    array = array.map(item => {
        return ucFirst(item)
    })
    return array.join(" ")
}

export const history = createBrowserHistory();

export const isAuthenticated = () => {
    let token = localStorage.getItem("_Bearer");
    if (!token && isEmpty(token))
        return false
    else if (jwt_decode(token).exp < Date.now() / 1000) {
        return false
    }
    return true
}

export const getDate = (data) => {
    let date = new Date(data);
    date = date.toISOString().split('T')[0]
    return date
}

export function getShortDate(timestamp) {
    var date = new Date(timestamp);

    // Create a list of names for the months
    // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // return a formatted date
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

export function getLongDate(timestamp) {
    var date = new Date(timestamp);

    // Create a list of names for the months
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // return a formatted date
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

export function getShortFullDate(timestamp) {
    var date = new Date(timestamp);

    // Create a list of names for the months
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // return a formatted date
    return date.getFullYear() + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getHours() + ':' + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
}

export const generateQueryParams = (obj) => {
    let payload = ""
    for (var i = 0; i < obj.length; i++) {
        let item = obj[i]
        if (item.value) {
            payload = `${payload}${item.key}=${item.value}&`
        }
    }
    if (payload.length > 0) {
        payload = payload.substring(0, payload.length - 1)
    }
    return payload
}

export function getFormattedTime(date) {
    // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date(date);
    // var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "AM";
    if (hr > 12) {
        hr -= 12;
        ampm = "PM";
    }
    // var date = d.getDate();
    // var month = months[d.getMonth()];
    // var year = d.getFullYear();
    return hr + ":" + min + ' ' + ampm;
}

export const setUrlQuery = (props, page, limit) => {
    return props.history.push({
        pathname: props.location.pathname,
        search: `?page=${page}&limit=${limit}`
    })
}

export const getUrlParameter = (query) => {
    var search = query.substring(1);
    return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) }) : {}
};

export const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location = '/'
}