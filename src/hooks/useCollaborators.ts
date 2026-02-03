import { useCallback, useEffect, useMemo, useState } from "react";
import type Worker from "../models/Worker";
import { buscarColaboradoresPorNome, listarColaboradores } from "../services/colaboradorService";

export function useCollaborators() {
  const [data, setData] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = query
        ? await buscarColaboradoresPorNome(query)
        : await listarColaboradores();
      setData(res);
    } catch (e: unknown) {
      setError("Falha ao carregar colaboradores");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const id = setTimeout(load, 400);
    return () => clearTimeout(id);
  }, [load]);

  const refetch = useCallback(() => {
    load();
  }, [load]);

  const updateLocal = useCallback((id: number, patch: Partial<Worker>) => {
    setData((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...patch } : w))
    );
  }, []);

  return useMemo(
    () => ({ data, isLoading, error, query, setQuery, refetch, updateLocal }),
    [data, isLoading, error, query, refetch, updateLocal]
  );
}
