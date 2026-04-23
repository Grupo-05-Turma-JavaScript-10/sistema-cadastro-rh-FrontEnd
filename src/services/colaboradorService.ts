import type Worker from "../models/Worker";
import type { Pendencia, AlertaVencimento, HistoricoSalarial, PacoteBeneficio } from "../models/NovosRecursos";
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

export async function criarColaborador(colaborador: Partial<Worker>): Promise<Worker> {
  const { data } = await api.post("/colaboradores", colaborador);
  return data;
}

export async function atualizarColaborador(colaborador: Partial<Worker> & { id: number }): Promise<Worker> {
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
  } catch (err: unknown) {
    const e = err as { response?: { status?: number } };
    if (e?.response?.status === 404 || e?.response?.status === 405) {
      const { data } = await api.post(`/colaboradores/${id}/calcular-salario`, payload);
      return data;
    }
    throw err;
  }
}

export async function listarPendenciasColaborador(id: number): Promise<Pendencia[]> {
  const { data } = await api.get(`/colaboradores/${id}/pendencias`);
  return data;
}

export async function gerarPendenciasPadrao(id: number): Promise<Pendencia[]> {
  const { data } = await api.post(`/colaboradores/${id}/pendencias/padrao`);
  return data;
}

export async function atualizarPendencia(pendencia: Pendencia): Promise<Pendencia> {
  const { data } = await api.put(`/pendencias`, pendencia);
  return data;
}

export async function listarPendenciasAbertas(): Promise<Pendencia[]> {
  const { data } = await api.get(`/pendencias?concluida=false`);
  return data;
}

export async function listarAlertasVencimentos(): Promise<AlertaVencimento[]> {
  const { data } = await api.get(`/colaboradores/alertas/vencimentos`);
  return data;
}

export async function listarHistoricoColaborador(id: number): Promise<HistoricoSalarial[]> {
  const { data } = await api.get(`/historico/colaborador/${id}`);
  return data;
}

export async function listarPacotesBeneficios(): Promise<PacoteBeneficio[]> {
  const { data } = await api.get(`/pacotes-beneficios`);
  return data;
}
