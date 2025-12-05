import axios from "axios"
import {baseUrl} from "../../api.ts";

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("Authorization"));
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;