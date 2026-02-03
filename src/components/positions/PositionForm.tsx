import { useEffect, useState } from "react";
import type Position from "../../models/Position";
import { Button } from "../ui/Button";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-corporate-slate">
            Nome do Cargo
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate placeholder:text-gray-400"
            placeholder="Ex: Desenvolvedor Senior"
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-corporate-slate">
            Descrição
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate placeholder:text-gray-400 min-h-25 resize-none"
            placeholder="Descreva as responsabilidades deste cargo..."
            value={form.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
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