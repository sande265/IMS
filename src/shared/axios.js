import { errorAlert } from '../actions/alert-actions';
import axios from 'axios'
import store from '../store';
import isEmpty from 'is-empty';
import jwtDecode from 'jwt-decode';

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
})

var activeAxiosRequests = 0;
let baseURL = process.env.REACT_APP_BASEURL

api.interceptors.request.use(
    function (config) {
        if (activeAxiosRequests > 0) {
            setTimeout(() => {
                let token = localStorage.getItem("_Bearer");
                if (token) {
                    config.headers["Authorization"] = 'Bearer ' + token;
                }
                return config;
            }, 3000)
        }
        else {
            let token = localStorage.getItem("_Bearer");
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        }
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error;
        if (error && error.status && error.status === 401 && !originalRequest._retry) {
            store.dispatch(errorAlert(error.data.message))
            if (isTokenExpired()) {
                let token = localStorage.getItem("_Bearer");
                localStorage.clear();
                originalRequest._retry = true;
                const access_token = await refresh(token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                return api(originalRequest);
            }
        }
        return Promise.reject(error.response)
    });

export const success = (type, payload) => {
    return { type: type, payload }
}

export const failure = (type, payload) => {
    return { type: type, payload }
}

export const processing = (type, payload) => {
    return { type: type, payload }
}

const isTokenExpired = () => {
    let token = localStorage.getItem("_Bearer");
    if (!isEmpty(token) && jwtDecode(token).exp < Date.now() / 1000) {
        return true
    }
    return false
}

const refresh = async (token) => {
    activeAxiosRequests++;
    const options = {
        url: baseURL + 'refresh',
        method: 'get',
        data: token,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return axios(options)
        .then((res) => {
            activeAxiosRequests--;
            setAuthToken(res.data.token)
            return res.data.token;
        })
        .catch((error) => {
            activeAxiosRequests--;
        });
}


export const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        api.defaults.headers.common["Authorization"] = 'Bearer ' + token;
        localStorage.setItem("_Bearer", token);
    } else {
        // Delete auth header
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("_Bearer");
    }
};
