import { useCallback, useMemo, useState } from "react";
import type Position from "../models/Position";
import { atualizarCargo, criarCargo } from "../services/cargoService";

export function usePosition() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(async (payload: Position) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = payload.id ? await atualizarCargo(payload) : await criarCargo(payload);
      return res;
    } catch {
      setError("Falha ao salvar cargo");
      throw new Error("save failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(() => ({ isLoading, error, save }), [isLoading, error, save]);
}
