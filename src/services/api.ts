import axios from "axios";

const api = axios.create({
    baseURL: "https://sistema-cadastro-rh-f16u.onrender.com/",
});

export default api;
