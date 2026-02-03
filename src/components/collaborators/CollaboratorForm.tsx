import { useEffect, useState } from "react";
import type Worker from "../../models/Worker";
import type Position from "../../models/Position";
import { Button } from "../ui/Button";
import { listarCargosAll } from "../../services/cargoService";

interface Props {
  initial?: Worker | null;
  onSubmit: (payload: Worker) => void | Promise<void>;
  onCancel?: () => void;
}

type FormData = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataAdmissao: string;
  salario: number;
  status: boolean;
  cargoId?: number;
};

export default function CollaboratorForm({ initial, onSubmit, onCancel }: Props) {
  const defaultForm = (): FormData => ({
    id: 0,
    nome: "",
    cpf: "",
    email: "",
    dataAdmissao: new Date().toISOString().substring(0, 10),
    salario: 0,
    status: true,
    cargoId: undefined,
  });
  const [form, setForm] = useState<FormData>(defaultForm());
  const [cargos, setCargos] = useState<Position[]>([]);

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? 0,
        nome: initial.nome ?? "",
        cpf: initial.cpf ?? "",
        email: initial.email ?? "",
        dataAdmissao: initial.data_admissão
          ? new Date(initial.data_admissão).toISOString().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        salario: initial.salario ?? 0,
        status: initial.status ?? true,
        cargoId: initial.cargo?.id,
      });
    } else {
      setForm(defaultForm());
    }
  }, [initial]);

  useEffect(() => {
    listarCargosAll().then(setCargos).catch(() => setCargos([]));
  }, []);

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = {
      nome: form.nome,
      cpf: form.cpf,
      email: form.email,
      dataAdmissao: form.dataAdmissao,
      data_admissao: form.dataAdmissao,
      salario: form.salario,
      status: form.status,
    };
    if (form.cargoId) {
      payload.cargo = { id: form.cargoId };
    }
    if (form.id) {
      payload.id = form.id;
    }
    await onSubmit(payload as unknown as Worker);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Nome</span>
          <input
            className="border rounded p-2"
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Email</span>
          <input
            type="email"
            className="border rounded p-2"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">CPF</span>
          <input
            className="border rounded p-2"
            value={form.cpf}
            onChange={(e) => handleChange("cpf", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Data de Admissão</span>
          <input
            type="date"
            className="border rounded p-2"
            value={form.dataAdmissao}
            onChange={(e) => handleChange("dataAdmissao", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Cargo</span>
          <select
            className="border rounded p-2"
            value={form.cargoId ?? ""}
            onChange={(e) =>
              handleChange("cargoId", e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">Selecione um cargo</option>
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Salário</span>
          <input
            type="number"
            className="border rounded p-2"
            value={form.salario}
            onChange={(e) => handleChange("salario", Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.status}
            onChange={(e) => handleChange("status", e.target.checked)}
          />
          <span className="text-sm text-gray-600">Ativo</span>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
