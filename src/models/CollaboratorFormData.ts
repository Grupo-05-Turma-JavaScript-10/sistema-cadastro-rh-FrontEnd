export type CollaboratorFormData = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataAdmissao: string;
  salario: number;
  status: boolean;
  cargoId?: number;
  dataFimExperiencia?: string;
  dataVencimentoAso?: string;
  dataLimiteFerias?: string;
  pacoteBeneficioId?: number;
  tipoContrato: "CLT" | "PJ" | "ESTAGIO";
};
