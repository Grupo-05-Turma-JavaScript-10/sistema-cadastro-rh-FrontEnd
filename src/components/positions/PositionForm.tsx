import { useEffect, useState } from "react";
import type Position from "../../models/Position";
import { Button } from "../ui/Button";
import { Briefcase, AlignLeft } from "lucide-react";

interface Props {
  initial?: Position | null;
  onSubmit: (payload: Position) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean; 
}

export default function PositionForm({ initial, onSubmit, onCancel, isLoading }: Props) {
  const [form, setForm] = useState<Position>({
    id: 0,
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? 0,
        nome: initial.nome ?? "",
        descricao: initial.descricao ?? "",
      });
    } else {
      setForm({
        id: 0,
        nome: "",
        descricao: "",
      });
    }
  }, [initial]);

  function handleChange<K extends keyof Position>(key: K, value: Position[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  const inputContainerClass = "relative group";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-teal transition-colors";
  const iconTextAreaClass = "absolute left-3 top-3 text-gray-400 group-focus-within:text-primary-teal transition-colors";
  const inputClass = "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all text-corporate-slate placeholder:text-gray-400";
  const labelClass = "block text-sm font-semibold text-corporate-slate mb-1.5 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div className="space-y-4">
        
        <div>
          <label className={labelClass}>Nome do Cargo</label>
          <div className={inputContainerClass}>
            <Briefcase size={18} className={iconClass} />
            <input
              type="text"
              className={inputClass}
              placeholder="Ex: Desenvolvedor Senior"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Descrição e Responsabilidades</label>
          <div className={inputContainerClass}>
            <AlignLeft size={18} className={iconTextAreaClass} />
            <textarea
              className={`${inputClass} min-h-30 resize-none`}
              placeholder="Descreva as principais responsabilidades deste cargo..."
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

     <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-2">
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
          {initial?.id ? "Salvar Alterações" : "Criar Cargo"}
        </Button>
      </div>
    </form>
  );
}