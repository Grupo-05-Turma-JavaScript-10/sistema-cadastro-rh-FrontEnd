import { useEffect, useState } from "react";
import type Position from "../../models/Position";
import { Button } from "../ui/Button";

interface Props {
  initial?: Position | null;
  onSubmit: (payload: Position) => Promise<void> | void;
  onCancel?: () => void;
}

export default function PositionForm({ initial, onSubmit, onCancel }: Props) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Nome do Cargo</span>
          <input
            className="border rounded p-2"
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm text-gray-600">Descrição</span>
          <textarea
            className="border rounded p-2 h-24"
            value={form.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            required
          />
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
