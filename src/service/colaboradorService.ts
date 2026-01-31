import type Worker from "../models/Worker";
import { atualizar, buscar, cadastrar, deletar } from "./baseService";

export const listarColaboradores = async (setDados: Function, header: Object = {}) => {
    await buscar("/colaboradores", setDados, header);
};

export const buscarColaboradorPorId = async (id: number, setDados: Function, header: Object = {}) => {
    await buscar(`/colaboradores/${id}`, setDados, header);
};

export const buscarColaboradoresPorNome = async (nome: string, setDados: Function, header: Object = {}) => {
    await buscar(`/colaboradores/nome/${nome}`, setDados, header);
};

export const criarColaborador = async (colaborador: Worker, setDados: Function, header: Object = {}) => {
    await cadastrar("/colaboradores", colaborador, setDados, header);
};

export const atualizarColaborador = async (colaborador: Worker, setDados: Function, header: Object = {}) => {
    await atualizar(`/colaboradores/${colaborador.id}`, colaborador, setDados, header);
};

export const deletarColaborador = async (id: number, header: Object = {}) => {
    await deletar(`/colaboradores/${id}`, header);
};

export const calcularSalarioColaborador = async (
    id: number,
    payload: Object,
    setDados: Function,
    header: Object = {}
) => {
    await atualizar(`/colaboradores/calcular-salario/${id}`, payload, setDados, header);
};
