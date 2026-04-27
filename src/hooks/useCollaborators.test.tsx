import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCollaborators } from './useCollaborators';
import * as colaboradorService from '../services/colaboradorService';
import type Worker from '../models/Worker';

vi.mock('../services/colaboradorService', () => ({
  listarColaboradores: vi.fn(),
  buscarColaboradoresPorNome: vi.fn(),
}));

describe('useCollaborators Hook', () => {
  const mockWorkers: Worker[] = [
    { id: 1, nome: 'Alice', cpf: '123', email: 'alice@a.com', data_admissão: new Date(), salario: 1000, status: true },
    { id: 2, nome: 'Bob', cpf: '456', email: 'bob@b.com', data_admissão: new Date(), salario: 2000, status: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve listar colaboradores no primeiro render (com debounce de 400ms)', async () => {
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue(mockWorkers);

    const { result } = renderHook(() => useCollaborators());

    // Aguarda o timeout do useEffect
    await waitFor(() => {
      expect(result.current.data).toEqual(mockWorkers);
    }, { timeout: 1000 });

    expect(colaboradorService.listarColaboradores).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeNull();
  });

  it('deve buscar colaboradores quando a query mudar', async () => {
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([]);
    
    const workerBusca = [{ ...mockWorkers[0], nome: 'Alice Edit' }];
    vi.mocked(colaboradorService.buscarColaboradoresPorNome).mockResolvedValue(workerBusca);

    const { result } = renderHook(() => useCollaborators());

    // Alterar a query
    act(() => {
      result.current.setQuery('Alice');
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(workerBusca);
    }, { timeout: 1000 });

    expect(colaboradorService.buscarColaboradoresPorNome).toHaveBeenCalledWith('Alice');
  });

  it('deve tratar erro na chamada da API', async () => {
    vi.mocked(colaboradorService.listarColaboradores).mockRejectedValue(new Error('Falha na rede'));

    const { result } = renderHook(() => useCollaborators());

    await waitFor(() => {
      expect(result.current.error).toBe('Falha ao carregar colaboradores');
    }, { timeout: 1000 });

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve atualizar o estado local via updateLocal() sem refetch', async () => {
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue(mockWorkers);
    const { result } = renderHook(() => useCollaborators());

    await waitFor(() => {
      expect(result.current.data.length).toBe(2);
    }, { timeout: 1000 });

    // Vamos atualizar o salario do Bob localmente
    act(() => {
      result.current.updateLocal(2, { salario: 2500 });
    });

    const bob = result.current.data.find(w => w.id === 2);
    expect(bob?.salario).toBe(2500);

    // O serviço da API não deve ter sido chamado novamente (além da listagem inicial)
    expect(colaboradorService.listarColaboradores).toHaveBeenCalledTimes(1);
  });
});
