import axios from "axios";

const defaultProd = "https://sistema-cadastro-rh-f16u.onrender.com";
const defaultDev = "http://localhost:4000";
const env = import.meta.env as unknown as {
    DEV?: boolean;
    VITE_API_BASE_URL?: string;
    VITE_API_URL?: string;
    VITE_API_BASE_URL_PROD?: string;
};
const baseURL =
    env.VITE_API_BASE_URL ||
    env.VITE_API_URL ||
    (env.DEV ? defaultDev : (env.VITE_API_BASE_URL_PROD || defaultProd));

const api = axios.create({
    baseURL,
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
