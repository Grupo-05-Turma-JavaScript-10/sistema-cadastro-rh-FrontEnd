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
        // Se receber 401 (Não autorizado) ou 403 (Proibido), significa que o token expirou ou é inválido
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Limpa o localStorage
            localStorage.removeItem("token");
            
            // Força o reload da página para limpar o estado em memória (AuthContext)
            // e forçar o PrivateRoute a jogar o usuário pro /login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
