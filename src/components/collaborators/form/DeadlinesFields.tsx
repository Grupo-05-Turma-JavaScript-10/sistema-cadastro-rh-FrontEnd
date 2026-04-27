import { Calendar } from "lucide-react";
import type { CollaboratorFormData } from "../../../models/CollaboratorFormData";
import { inputContainerClass, iconClass, inputClass, labelClass } from "./FormStyles";

interface Props {
  form: CollaboratorFormData;
  handleChange: <K extends keyof CollaboratorFormData>(key: K, value: CollaboratorFormData[K]) => void;
}

export function DeadlinesFields({ form, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-metallic-silver uppercase tracking-wider border-b border-gray-100 pb-2 mt-2">
        Controle de Prazos (Opcional)
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div>
          <label className={labelClass}>Fim da Experiência</label>
          <div className={inputContainerClass}>
            <Calendar size={18} className={iconClass} />
            <input
              type="date"
              className={inputClass}
              value={form.dataFimExperiencia}
              onChange={(e) => handleChange("dataFimExperiencia", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Vencimento ASO</label>
          <div className={inputContainerClass}>
            <Calendar size={18} className={iconClass} />
            <input
              type="date"
              className={inputClass}
              value={form.dataVencimentoAso}
              onChange={(e) => handleChange("dataVencimentoAso", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Limite para Férias</label>
          <div className={inputContainerClass}>
            <Calendar size={18} className={iconClass} />
            <input
              type="date"
              className={inputClass}
              value={form.dataLimiteFerias}
              onChange={(e) => handleChange("dataLimiteFerias", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
