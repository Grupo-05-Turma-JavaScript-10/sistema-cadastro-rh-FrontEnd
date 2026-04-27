import api from "./api";

export const cadastrarUsuario = async <T>(url: string, dados: unknown, setDados: (dados: T) => void) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data as T);
};

export const login = async <T>(url: string, dados: unknown, setDados: (dados: T) => void) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data as T);
};
