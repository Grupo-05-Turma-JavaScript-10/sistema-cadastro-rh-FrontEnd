import { useState, useEffect } from "react";
import type Worker from "../models/Worker";
import type { CollaboratorFormData } from "../models/CollaboratorFormData";
import { formatCPFInput, unformatNumbers } from "../utils/formatters";

export function useCollaboratorForm(
  initial: Worker | null | undefined,
  onSubmit: (payload: Worker) => void | Promise<void>
) {
  const defaultForm = (): CollaboratorFormData => ({
    id: 0,
    nome: "",
    cpf: "",
    email: "",
    dataAdmissao: new Date().toISOString().substring(0, 10),
    salario: 0,
    status: true,
    cargoId: undefined,
    dataFimExperiencia: "",
    dataVencimentoAso: "",
    dataLimiteFerias: "",
    pacoteBeneficioId: undefined,
    tipoContrato: "CLT",
  });

  const [form, setForm] = useState<CollaboratorFormData>(defaultForm());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? 0,
        nome: initial.nome ?? "",
        cpf: formatCPFInput(initial.cpf ?? ""),
        email: initial.email ?? "",
        dataAdmissao: initial.data_admissão
          ? new Date(initial.data_admissão).toISOString().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        salario: initial.salario ?? 0,
        status: initial.status ?? true,
        cargoId: initial.cargo?.id,
        dataFimExperiencia: initial.dataFimExperiencia
          ? new Date(initial.dataFimExperiencia).toISOString().substring(0, 10)
          : "",
        dataVencimentoAso: initial.dataVencimentoAso
          ? new Date(initial.dataVencimentoAso).toISOString().substring(0, 10)
          : "",
        dataLimiteFerias: initial.dataLimiteFerias
          ? new Date(initial.dataLimiteFerias).toISOString().substring(0, 10)
          : "",
        pacoteBeneficioId: initial.pacoteBeneficio?.id,
        tipoContrato: initial.tipoContrato || "CLT",
      });
    } else {
      setForm(defaultForm());
    }
  }, [initial]);

  function handleChange<K extends keyof CollaboratorFormData>(key: K, value: CollaboratorFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: Record<string, unknown> = {
        nome: form.nome,
        cpf: unformatNumbers(form.cpf),
        email: form.email,
        dataAdmissao: form.dataAdmissao,
        data_admissao: form.dataAdmissao,
        salario: form.salario,
        status: form.status,
        tipoContrato: form.tipoContrato,
      };

      if (form.dataFimExperiencia) payload.dataFimExperiencia = form.dataFimExperiencia;
      if (form.dataVencimentoAso) payload.dataVencimentoAso = form.dataVencimentoAso;
      if (form.dataLimiteFerias) payload.dataLimiteFerias = form.dataLimiteFerias;
      if (form.cargoId) payload.cargo = { id: form.cargoId };
      if (form.pacoteBeneficioId) payload.pacoteBeneficio = { id: form.pacoteBeneficioId };
      if (form.id) payload.id = form.id;

      await onSubmit(payload as unknown as Worker);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    handleChange,
    handleSubmit,
    isLoading,
  };
}
