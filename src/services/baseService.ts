import api from "./api";

export const buscar = async (url: string, setDados: Function, header: Object = {}) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object = {}) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
};

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object = {}) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
};

export const deletar = async (url: string, header: Object = {}) => {
    await api.delete(url, header);
};

export async function getAll<T>(path: string): Promise<T[]> {
    const { data } = await api.get(path);
    return data;
}

export async function getById<T>(path: string, id: string | number): Promise<T> {
    const { data } = await api.get(`${path}/${id}`);
    return data;
}

export async function create<T>(path: string, payload: unknown): Promise<T> {
    const { data } = await api.post(path, payload);
    return data;
}

export async function update<T>(path: string, id: string | number, payload: unknown): Promise<T> {
    const { data } = await api.put(`${path}/${id}`, payload);
    return data;
}

export async function remove(path: string, id: string | number): Promise<void> {
    await api.delete(`${path}/${id}`);
}
