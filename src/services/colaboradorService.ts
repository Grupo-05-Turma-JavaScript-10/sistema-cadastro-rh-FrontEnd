import type Worker from "../models/Worker";
import api from "./api";

export async function listarColaboradores(): Promise<Worker[]> {
  const { data } = await api.get("/colaboradores");
  return data;
}

export async function buscarColaboradorPorId(id: number): Promise<Worker> {
  const { data } = await api.get(`/colaboradores/${id}`);
  return data;
}

export async function buscarColaboradoresPorNome(nome: string): Promise<Worker[]> {
  const { data } = await api.get(`/colaboradores/nome/${encodeURIComponent(nome)}`);
  return data;
}

export async function criarColaborador(colaborador: Worker): Promise<Worker> {
  const { data } = await api.post("/colaboradores", colaborador);
  return data;
}

export async function atualizarColaborador(colaborador: Worker): Promise<Worker> {
  const { data } = await api.put(`/colaboradores`, colaborador);
  return data;
}

export async function deletarColaborador(id: number): Promise<void> {
  await api.delete(`/colaboradores/${id}`);
}

export async function calcularSalarioColaborador(id: number, payload: Record<string, unknown>): Promise<Worker> {
  try {
    const { data } = await api.put(`/colaboradores/calcular-salario/${id}`, payload);
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404 || err?.response?.status === 405) {
      const { data } = await api.post(`/colaboradores/${id}/calcular-salario`, payload);
      return data;
    }
    throw err;
  }
}
