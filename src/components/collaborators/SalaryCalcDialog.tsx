import Popup from "reactjs-popup";
import { useMemo, useState } from "react";
import { Button } from "../ui/Button";
import type Worker from "../../models/Worker";

interface Props {
  open: boolean;
  onClose: () => void;
  worker?: Worker | null;
  onCalculate?: (payload: Record<string, unknown>) => Promise<any> | any;
}

export default function SalaryCalcDialog({ open, onClose, onCalculate, worker }: Props) {
  const [horasTrabalhadas, setHorasTrabalhadas] = useState<number>(0);
  const valorHora = useMemo(() => {
    const base = Number(worker?.salario) || 0;
    const vh = base > 0 ? base / 220 : 0;
    return Number.isFinite(vh) ? vh : 0;
  }, [worker]);
  const [bonus, setBonus] = useState<number>(0);
  const [descontos, setDescontos] = useState<number>(0);
  const [bonusInput, setBonusInput] = useState<string>(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(0));
  const [descontosInput, setDescontosInput] = useState<string>(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(0));
  const [result, setResult] = useState<number | null>(null);
  const preview = useMemo(() => {
    const bruto = horasTrabalhadas * valorHora + bonus - descontos;
    return Number.isFinite(bruto) ? bruto : 0;
  }, [horasTrabalhadas, valorHora, bonus, descontos]);
  function parseCurrencyInput(value: string) {
    const digits = value.replace(/\D/g, "");
    const num = Number(digits) / 100;
    return Number.isFinite(num) ? num : 0;
  }
  function formatBRL(n: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n || 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { horasTrabalhadas, valorHora, bonus, descontos };
    const salario = horasTrabalhadas * valorHora + bonus - descontos;
    setResult(Number.isFinite(salario) ? salario : null);
    if (onCalculate) {
      try {
        await onCalculate(payload);
      } catch {
        // ignore backend errors; local result is authoritative
      }
    }
  }

  return (
    <Popup
      open={open}
      onClose={onClose}
      closeOnDocumentClick
      modal
      overlayStyle={{ background: "rgba(0,0,0,0.3)" }}
      contentStyle={{ background: "transparent", border: "none", padding: 0 }}
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">Calcular Salário</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Base (salário atual)</span>
            <input
              type="number"
              className="border rounded p-2"
              value={Number(worker?.salario) || 0}
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Valor Hora (base/220)</span>
            <input
              type="number"
              step="0.01"
              className="border rounded p-2"
              value={valorHora.toFixed(2)}
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Horas Trabalhadas</span>
            <input
              type="number"
              className="border rounded p-2"
              value={horasTrabalhadas}
              onChange={(e) => setHorasTrabalhadas(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Bônus</span>
            <input
              type="text"
              className="border rounded p-2"
              value={bonusInput}
              onChange={(e) => {
                const num = parseCurrencyInput(e.target.value);
                setBonus(num);
                setBonusInput(formatBRL(num));
              }}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Descontos</span>
            <input
              type="text"
              className="border rounded p-2"
              value={descontosInput}
              onChange={(e) => {
                const num = parseCurrencyInput(e.target.value);
                setDescontos(num);
                setDescontosInput(formatBRL(num));
              }}
            />
          </label>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-700">
          <div><span className="font-semibold">Prévia:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preview)}</div>
          <div className="text-xs text-gray-500">Fórmula: horas × valorHora + bônus − descontos</div>
        </div>

        {result !== null && (
          <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-700">
            <span className="font-semibold">Salário calculado: </span>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result)}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose}>Fechar</Button>
          <Button type="submit">Calcular</Button>
        </div>
      </form>
    </Popup>
  );
}
