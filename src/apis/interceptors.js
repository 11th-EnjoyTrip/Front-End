import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredential: true,
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
