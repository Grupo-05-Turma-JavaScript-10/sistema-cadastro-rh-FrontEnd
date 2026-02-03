import axios from "axios";

const api = axios.create({
    baseURL: "https://sistema-cadastro-rh-f16u.onrender.com",
});

api.interceptors.request.use((config) => {
    const stored = localStorage.getItem("token");
    if (stored) {
        config.headers = config.headers ?? {};
        const value = stored.startsWith("Bearer ") ? stored : `Bearer ${stored}`;
        config.headers.Authorization = value;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // não limpar token automaticamente em 401; deixar o guard de rota decidir
        return Promise.reject(error);
    }
);

export default api;
