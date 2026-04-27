import { User, Mail, FileText, Gift } from "lucide-react";
import type { CollaboratorFormData } from "../../../models/CollaboratorFormData";
import type { PacoteBeneficio } from "../../../models/NovosRecursos";
import { formatBRL, formatCPFInput } from "../../../utils/formatters";
import { inputContainerClass, iconClass, inputClass, labelClass } from "./FormStyles";

interface Props {
  form: CollaboratorFormData;
  handleChange: <K extends keyof CollaboratorFormData>(key: K, value: CollaboratorFormData[K]) => void;
  pacotes: PacoteBeneficio[];
}

export function PersonalDataFields({ form, handleChange, pacotes }: Props) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-metallic-silver uppercase tracking-wider border-b border-gray-100 pb-2">
        Dados Pessoais
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <label htmlFor="nome" className={labelClass}>Nome Completo</label>
          <div className={inputContainerClass}>
            <User size={18} className={iconClass} />
            <input
              id="nome"
              className={inputClass}
              placeholder="Ex: João da Silva"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>E-mail Corporativo</label>
          <div className={inputContainerClass}>
            <Mail size={18} className={iconClass} />
            <input
              id="email"
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
          <label htmlFor="cpf" className={labelClass}>CPF</label>
          <div className={inputContainerClass}>
            <FileText size={18} className={iconClass} />
            <input
              id="cpf"
              className={inputClass}
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={(e) => handleChange("cpf", formatCPFInput(e.target.value))}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Pacote de Benefícios</label>
          <div className={inputContainerClass}>
            <Gift size={18} className={iconClass} />
            <select
              className={`${inputClass} appearance-none bg-white`}
              value={form.pacoteBeneficioId ?? ""}
              onChange={(e) => handleChange("pacoteBeneficioId", e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">Sem pacote (Apenas VT/VR padrão)</option>
              {pacotes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({formatBRL(p.valorTotal)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
