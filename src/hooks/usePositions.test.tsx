import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePositions } from './usePositions';
import * as cargoService from '../services/cargoService';

vi.mock('../services/cargoService', () => ({
  listarCargos: vi.fn(),
  buscarCargosPorDescricao: vi.fn(),
}));

describe('usePositions Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar todos os cargos inicialmente', async () => {
    const mockCargos = [{ id: 1, nome: 'Dev', descricao: 'Desenvolvedor' }];
    vi.mocked(cargoService.listarCargos).mockResolvedValue(mockCargos);

    const { result } = renderHook(() => usePositions());

    // Inicialmente isLoading é false ou logo fica true (no useEffect)
    // Então aguardamos o debounce de 400ms do useEffect terminar
    await waitFor(() => {
      expect(result.current.data).toEqual(mockCargos);
    }, { timeout: 1000 });

    expect(cargoService.listarCargos).toHaveBeenCalledTimes(1);
    expect(cargoService.buscarCargosPorDescricao).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve buscar cargos por descrição quando query é alterada', async () => {
    vi.mocked(cargoService.listarCargos).mockResolvedValue([]);
    const mockBusca = [{ id: 2, nome: 'QA', descricao: 'Tester' }];
    vi.mocked(cargoService.buscarCargosPorDescricao).mockResolvedValue(mockBusca);

    const { result } = renderHook(() => usePositions());

    // Altera a query (simula usuário digitando no input)
    act(() => {
      result.current.setQuery('QA');
    });

    // Aguarda debounce de 400ms
    await waitFor(() => {
      expect(result.current.data).toEqual(mockBusca);
    }, { timeout: 1000 });

    expect(cargoService.buscarCargosPorDescricao).toHaveBeenCalledWith('QA');
  });

  it('deve lidar com erro na API', async () => {
    vi.mocked(cargoService.listarCargos).mockRejectedValue(new Error('Erro na API'));

    const { result } = renderHook(() => usePositions());

    await waitFor(() => {
      expect(result.current.error).toBe('Falha ao carregar cargos');
    }, { timeout: 1000 });

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
