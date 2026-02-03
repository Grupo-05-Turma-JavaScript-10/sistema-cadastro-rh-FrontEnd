import { useCallback, useMemo, useState } from "react";
import type Worker from "../models/Worker";
import { calcularSalarioColaborador } from "../services/colaboradorService";

export function useSalaryCalc(id: number) {
  const [result, setResult] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (payload: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await calcularSalarioColaborador(id, payload);
      setResult(res);
      return res;
    } catch {
      setError("Falha ao calcular salário");
      throw new Error("calc failed");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return useMemo(() => ({ result, isLoading, error, calculate }), [result, isLoading, error, calculate]);
}
