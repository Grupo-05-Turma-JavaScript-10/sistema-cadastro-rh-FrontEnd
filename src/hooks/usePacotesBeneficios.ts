import { useState, useEffect } from "react";
import type { PacoteBeneficio } from "../models/NovosRecursos";
import { listarPacotesBeneficios } from "../services/colaboradorService";

export function usePacotesBeneficios() {
  const [pacotes, setPacotes] = useState<PacoteBeneficio[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listarPacotesBeneficios()
      .then(setPacotes)
      .catch(() => setPacotes([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { pacotes, isLoading };
}
