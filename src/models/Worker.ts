import type Position from "./Position";
import type User from "./User";

export default interface Worker {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    data_admissão: Date;
    salario: number;
    status: boolean;
    cargo?: Position;
    usuario?: User;
    dataFimExperiencia?: string;
    dataVencimentoAso?: string;
    dataLimiteFerias?: string;
    pacoteBeneficio?: { id: number; nome?: string; valorTotal?: number };
    tipoContrato?: "CLT" | "PJ" | "ESTAGIO";
    encargos?: number;
    encargosMensais?: number;
    custoTotal?: number;
}