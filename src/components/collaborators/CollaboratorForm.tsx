import { useEffect, useState } from "react";
import type Worker from "../../models/Worker";
import type Position from "../../models/Position";
import { Button } from "../ui/Button";
import { listarCargosAll } from "../../services/cargoService";
import {
  User,
  Mail,
  FileText,
  Calendar,
  Briefcase,
  DollarSign
} from "lucide-react";

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
  const [salarioInput, setSalarioInput] = useState<string>("");
  function formatBRL(n: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n || 0);
  }
  function parseCurrencyInput(value: string) {
    const digits = value.replace(/\D/g, "");
    const num = Number(digits) / 100;
    return Number.isFinite(num) ? num : 0;
  }
  function formatCPFInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length >= 4) parts.push(digits.slice(3, 6));
    if (digits.length >= 7) parts.push(digits.slice(6, 9));
    const suffix = digits.length >= 10 ? digits.slice(9, 11) : digits.slice(9);
    const body = parts.join(".");
    return suffix ? `${body}-${suffix}` : body;
  }
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
      });
      setSalarioInput(formatBRL(initial.salario ?? 0));
    } else {
      setForm(defaultForm());
      setSalarioInput(formatBRL(0));
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
      cpf: form.cpf.replace(/\D/g, ""),
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
    setIsLoading(false);
  }
  const inputContainerClass = "relative group";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-teal transition-colors";
  const inputClass = "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all text-corporate-slate placeholder:text-gray-400";
  const labelClass = "block text-sm font-semibold text-corporate-slate mb-1.5 ml-1";
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-metallic-silver uppercase tracking-wider border-b border-gray-100 pb-2">
          Dados Pessoais
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="md:col-span-2">
            <label className={labelClass}>Nome Completo</label>
            <div className={inputContainerClass}>
              <User size={18} className={iconClass} />
              <input
                className={inputClass}
                placeholder="Ex: João da Silva"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>E-mail Corporativo</label>
            <div className={inputContainerClass}>
              <Mail size={18} className={iconClass} />
              <input
                type="email"
                className={inputClass}
                placeholder="joao@empresa.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>CPF</label>
            <div className={inputContainerClass}>
              <FileText size={18} className={iconClass} />
              <input
                className={inputClass}
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={(e) => handleChange("cpf", formatCPFInput(e.target.value))}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-metallic-silver uppercase tracking-wider border-b border-gray-100 pb-2 mt-2">
          Dados Contratuais
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="md:col-span-2">
            <label className={labelClass}>Cargo / Função</label>
            <div className={inputContainerClass}>
              <Briefcase size={18} className={iconClass} />
              <select
                className={`${inputClass} appearance-none bg-white`}
                value={form.cargoId ?? ""}
                onChange={(e) => handleChange("cargoId", e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Selecione um cargo...</option>
                {cargos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Salário Base</label>
            <div className={inputContainerClass}>
              <DollarSign size={18} className={iconClass} />
              <input
                type="text"
                className={inputClass}
                placeholder="0,00"
                value={salarioInput}
                onChange={(e) => {
                  const num = parseCurrencyInput(e.target.value);
                  setSalarioInput(formatBRL(num));
                  handleChange("salario", num);
                }}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Data de Admissão</label>
            <div className={inputContainerClass}>
              <Calendar size={18} className={iconClass} />
              <input
                type="date"
                className={inputClass}
                value={form.dataAdmissao}
                onChange={(e) => handleChange("dataAdmissao", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-corporate-slate">Situação Cadastral</span>
          <span className="text-xs text-metallic-silver">Define se o colaborador está ativo ou inativo na empresa.</span>
        </div>
        
        <div className="flex items-center gap-3">
            <span className={`text-sm font-bold transition-colors ${form.status ? 'text-primary-teal' : 'text-gray-400'}`}>
                {form.status ? 'Ativo' : 'Inativo'}
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                className="sr-only peer"
                checked={form.status}
                onChange={(e) => handleChange("status", e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-teal"></div>
            </label>
        </div>
        </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
        {onCancel && (
          <Button
            type="button"
            variant="ghost" 
            onClick={onCancel}
            disabled={isLoading}
            className="text-gray-500 hover:text-corporate-slate hover:bg-gray-100"
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {form.id ? "Salvar Alterações" : "Cadastrar Colaborador"}
        </Button>
      </div>
    </form>
  );
}
