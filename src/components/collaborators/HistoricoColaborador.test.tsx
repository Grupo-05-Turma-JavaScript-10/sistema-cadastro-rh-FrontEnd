import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HistoricoColaborador } from './HistoricoColaborador';
import type Worker from '../../models/Worker';
import type { HistoricoSalarial } from '../../models/NovosRecursos';
import { toast } from 'react-toastify';
import { listarHistoricoColaborador } from '../../services/colaboradorService';

vi.mock('../../services/colaboradorService', () => ({
  listarHistoricoColaborador: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('HistoricoColaborador', () => {
  const worker: Worker = {
    id: 1,
    nome: 'João',
    cpf: '11122233344',
    email: 'joao@empresa.com',
    data_admissão: new Date(),
    salario: 1000,
    status: true,
    tipoContrato: 'CLT',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar estado vazio quando não existem registros', async () => {
    vi.mocked(listarHistoricoColaborador).mockResolvedValueOnce([]);

    render(<HistoricoColaborador colaborador={worker} />);

    expect(screen.getByText(/Carregando histórico/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Nenhum histórico registrado/i)).toBeInTheDocument();
    });
  });

  it('deve renderizar registros de histórico com cargos e salários formatados', async () => {
    const historico: HistoricoSalarial[] = [
      {
        id: 1,
        motivo: 'Promoção',
        dataAlteracao: new Date('2026-01-01').toISOString(),
        cargoAnterior: { id: 1, nome: 'Junior' },
        cargoNovo: { id: 2, nome: 'Pleno' },
        salarioAnterior: '2000',
        salarioNovo: '3000',
      },
    ];
    vi.mocked(listarHistoricoColaborador).mockResolvedValueOnce(historico);

    render(<HistoricoColaborador colaborador={worker} />);

    await waitFor(() => {
      expect(screen.getByText('Promoção')).toBeInTheDocument();
      expect(screen.getByText('Junior')).toBeInTheDocument();
      expect(screen.getByText('Pleno')).toBeInTheDocument();
      expect(screen.getByText(/R\$\s*2\.000,00/i)).toBeInTheDocument();
      expect(screen.getByText(/R\$\s*3\.000,00/i)).toBeInTheDocument();
    });
  });

  it('deve mostrar toast de erro se falhar ao buscar histórico', async () => {
    vi.mocked(listarHistoricoColaborador).mockRejectedValueOnce(new Error('Falha'));

    await act(async () => {
      render(<HistoricoColaborador colaborador={worker} />);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
