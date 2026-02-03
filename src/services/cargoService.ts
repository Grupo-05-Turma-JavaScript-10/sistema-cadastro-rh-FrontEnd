import type Position from "../models/Position";
import api from "./api";

export async function listarCargos(): Promise<Position[]> {
    const { data } = await api.get("/cargos");
    return data;
}

export async function buscarCargoPorId(id: number): Promise<Position> {
    const { data } = await api.get(`/cargos/${id}`);
    return data;
}

export async function buscarCargosPorDescricao(descricao: string): Promise<Position[]> {
    const { data } = await api.get(`/cargos/descricao/${encodeURIComponent(descricao)}`);
    return data;
}

export async function criarCargo(cargo: Position): Promise<Position> {
    const { data } = await api.post("/cargos", cargo);
    return data;
}

export async function atualizarCargo(cargo: Position): Promise<Position> {
    const { data } = await api.put("/cargos", cargo);
    return data;
}

export async function deletarCargo(id: number): Promise<void> {
    await api.delete(`/cargos/${id}`);
}

export async function listarCargosAll(): Promise<Position[]> {
    const { data } = await api.get("/cargos");
    return data;
}
