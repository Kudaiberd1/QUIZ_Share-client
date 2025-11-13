import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1",
});

api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("Authorization"));
    if(token){
        config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
})

export default api;