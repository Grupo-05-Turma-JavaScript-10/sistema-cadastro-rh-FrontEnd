import { useCallback, useEffect, useMemo, useState } from "react";
import type Worker from "../models/Worker";
import { buscarColaboradorPorId, atualizarColaborador, criarColaborador } from "../services/colaboradorService";

export function useCollaborator(id?: number) {
  const [data, setData] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) {
      setData(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await buscarColaboradorPorId(id);
      setData(res);
    } catch {
      setError("Falha ao carregar colaborador");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(async (payload: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = payload.id ? await atualizarColaborador(payload) : await criarColaborador(payload);
      setData(res);
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Falha ao salvar colaborador";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(() => ({ data, isLoading, error, load, save }), [data, isLoading, error, load, save]);
}
