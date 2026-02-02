import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import type SalaryRecord from "../../models/SalaryRecord";
import { listarSalariosPorColaborador } from "../../services/colaboradorService";
import { Button } from "../ui/Button";

interface Props {
  open: boolean;
  workerId: number | null;
  onClose: () => void;
}

export default function SalaryHistoryDialog({ open, workerId, onClose }: Props) {
  const [items, setItems] = useState<SalaryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    async function load() {
      if (!workerId) return;
      if (!supported) return;
      setLoading(true);
      setError(null);
      try {
        const res = await listarSalariosPorColaborador(workerId);
        setItems(Array.isArray(res) ? res : []);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setSupported(false);
          setItems([]);
          setError(null);
        } else {
          setItems([]);
          setError("Não foi possível carregar o histórico de salários");
        }
      } finally {
        setLoading(false);
      }
    }
    if (open) load();
  }, [open, workerId, supported]);

  return (
    <Popup
      open={open}
      onClose={onClose}
      closeOnDocumentClick
      modal
      overlayStyle={{ background: "rgba(0,0,0,0.3)" }}
      contentStyle={{ background: "transparent", border: "none", padding: 0 }}
    >
      <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg w-full max-w-3xl">
        <h3 className="text-lg font-semibold">Histórico de Salários</h3>
        {loading && <div className="text-sm text-gray-600">Carregando...</div>}
        {error && <div className="text-sm text-error-red">{error}</div>}
        {!supported && (
          <div className="text-sm text-gray-600">Histórico de salários indisponível neste backend.</div>
        )}
        {!loading && !error && (
          <div className="space-y-2">
            {items.length === 0 ? (
              <div className="text-sm text-gray-600">Sem registros.</div>
            ) : (
              items.map((r) => (
                <div key={r.id} className="border border-gray-200 rounded p-3 flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    <div><span className="font-semibold">Período:</span> {r.periodo || "-"}</div>
                    <div><span className="font-semibold">Horas:</span> {r.horas ?? 0}</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div><span className="font-semibold">Base:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(r.base || 0)}</div>
                    <div><span className="font-semibold">Líquido:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(r.liquido || 0)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Popup>
  );
}
