import axios from "axios";
// 

const apiBackend = import.meta.env.VITE_BASE_URL
console.log(apiBackend)
const clienteAxios = axios.create({
    baseURL: apiBackend
});
clienteAxios.interceptors.request.use(config => {

    if (window.localStorage.token) {
        config.headers.Authorization = `Bearer ${window.localStorage.token}`; // eslint-disable-line no-param-reassign
    }
    return config;
});
// }, err => Promise.reject(err)); // Do something with request error
export default clienteAxios;
