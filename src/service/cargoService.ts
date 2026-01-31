import type Position from "../models/Position";
import { atualizar, buscar, cadastrar, deletar } from "./baseService";

export const listarCargos = async (setDados: Function, header: Object = {}) => {
    await buscar("/cargos", setDados, header);
};

export const buscarCargoPorId = async (id: number, setDados: Function, header: Object = {}) => {
    await buscar(`/cargos/${id}`, setDados, header);
};

export const buscarCargosPorDescricao = async (descricao: string, setDados: Function, header: Object = {}) => {
    await buscar(`/cargos/descricao/${descricao}`, setDados, header);
};

export const criarCargo = async (cargo: Position, setDados: Function, header: Object = {}) => {
    await cadastrar("/cargos", cargo, setDados, header);
};

export const atualizarCargo = async (cargo: Position, setDados: Function, header: Object = {}) => {
    await atualizar("/cargos", cargo, setDados, header);
};

export const deletarCargo = async (id: number, header: Object = {}) => {
    await deletar(`/cargos/${id}`, header);
};
