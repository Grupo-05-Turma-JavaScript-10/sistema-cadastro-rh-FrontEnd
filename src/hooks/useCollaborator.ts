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

  const save = useCallback(async (payload: Partial<Worker> & { id?: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = payload.id
        ? await atualizarColaborador(payload as Partial<Worker> & { id: number })
        : await criarColaborador(payload);
      setData(res);
      return res;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string; error?: string } } };
      const message = e?.response?.data?.message || e?.response?.data?.error || "Falha ao salvar colaborador";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(() => ({ data, isLoading, error, load, save }), [data, isLoading, error, load, save]);
}
