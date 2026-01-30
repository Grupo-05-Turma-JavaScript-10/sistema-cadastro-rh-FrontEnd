import type Worker from "./Worker";

export default interface Position {
    id: number;
    nome: string;
    descricao: string;
    colaborador?: Worker[];
}