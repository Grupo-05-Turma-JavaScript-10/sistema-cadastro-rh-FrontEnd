export interface Pendencia {
  id: number;
  titulo: string;
  concluida: boolean;
  observacao?: string;
  dataConclusao?: string;
  colaboradorId: number;
  colaboradorNome?: string;
}

export interface AlertaVencimento {
  id: number;
  nome: string;
  tipoAlerta: string;
  diasRestantes: number;
  data: string;
}

export interface HistoricoSalarial {
  id: number;
  salarioAnterior: string;
  salarioNovo: string;
  motivo: string;
  dataAlteracao: string;
  cargoAnterior: { id: number; nome: string };
  cargoNovo: { id: number; nome: string };
}

export interface PacoteBeneficio {
  id: number;
  nome: string;
  descricao?: string;
  valorTotal: number;
}