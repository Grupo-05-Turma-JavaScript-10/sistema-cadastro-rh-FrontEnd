import { FileText, Briefcase, DollarSign, Calendar } from "lucide-react";
import type { CollaboratorFormData } from "../../../models/CollaboratorFormData";
import type Position from "../../../models/Position";
import { formatBRL, parseCurrencyInput } from "../../../utils/formatters";
import { inputContainerClass, iconClass, inputClass, labelClass } from "./FormStyles";
import { useState, useEffect } from "react";

interface Props {
  form: CollaboratorFormData;
  handleChange: <K extends keyof CollaboratorFormData>(key: K, value: CollaboratorFormData[K]) => void;
  cargos: Position[];
}

export function ContractDataFields({ form, handleChange, cargos }: Props) {
  const [salarioInput, setSalarioInput] = useState<string>("");

  useEffect(() => {
    setSalarioInput(formatBRL(form.salario));
  }, [form.salario]);

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-metallic-silver uppercase tracking-wider border-b border-gray-100 pb-2 mt-2">
        Dados Contratuais
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <label className={labelClass}>Tipo de Contrato</label>
          <div className={inputContainerClass}>
            <FileText size={18} className={iconClass} />
            <select
              className={`${inputClass} appearance-none bg-white`}
              value={form.tipoContrato}
              onChange={(e) => handleChange("tipoContrato", e.target.value as "CLT" | "PJ" | "ESTAGIO")}
              required
            >
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="ESTAGIO">Estágio</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-2">
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
          <label htmlFor="salario" className={labelClass}>Salário Base</label>
          <div className={inputContainerClass}>
            <DollarSign size={18} className={iconClass} />
            <input
              id="salario"
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
  );
}
