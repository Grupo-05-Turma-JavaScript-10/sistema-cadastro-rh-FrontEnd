import { useCallback, useEffect, useMemo, useState } from "react";
import type Position from "../models/Position";
import { buscarCargosPorDescricao, listarCargos } from "../services/cargoService";

export function usePositions() {
  const [data, setData] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = query ? await buscarCargosPorDescricao(query) : await listarCargos();
      setData(res);
    } catch {
      setError("Falha ao carregar cargos");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const id = setTimeout(load, 400);
    return () => clearTimeout(id);
  }, [load]);

  const refetch = useCallback(() => load(), [load]);

  return useMemo(() => ({ data, isLoading, error, query, setQuery, refetch }), [data, isLoading, error, query, refetch]);
}
