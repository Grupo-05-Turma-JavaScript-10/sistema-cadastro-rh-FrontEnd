import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChecklistAdmissao } from './ChecklistAdmissao';
import type Worker from '../../models/Worker';
import type { Pendencia } from '../../models/NovosRecursos';
import { toast } from 'react-toastify';
import { listarPendenciasColaborador, gerarPendenciasPadrao, atualizarPendencia } from '../../services/colaboradorService';

vi.mock('../../services/colaboradorService', () => ({
  listarPendenciasColaborador: vi.fn(),
  gerarPendenciasPadrao: vi.fn(),
  atualizarPendencia: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ChecklistAdmissao', () => {
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

  it('deve renderizar estado vazio quando não existem pendências', async () => {
    vi.mocked(listarPendenciasColaborador).mockResolvedValueOnce([]);

    render(<ChecklistAdmissao colaborador={worker} />);

    expect(screen.getByText(/Carregando checklist/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Nenhuma pendência cadastrada/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Gerar Checklist Padrão/i })).toBeInTheDocument();
    });
  });

  it('deve gerar checklist padrão quando clicar no botão', async () => {
    const user = userEvent.setup();
    vi.mocked(listarPendenciasColaborador).mockResolvedValueOnce([]);
    const pendencias: Pendencia[] = [
      { id: 10, titulo: 'Entregar RG', concluida: false, colaboradorId: 1 },
    ];
    vi.mocked(gerarPendenciasPadrao).mockResolvedValueOnce(pendencias);

    render(<ChecklistAdmissao colaborador={worker} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Gerar Checklist Padrão/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /Gerar Checklist Padrão/i }));

    await waitFor(() => {
      expect(gerarPendenciasPadrao).toHaveBeenCalledWith(1);
      expect(screen.getByText('Entregar RG')).toBeInTheDocument();
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('deve alternar status de pendência ao clicar no checkbox', async () => {
    const user = userEvent.setup();
    const pendencias: Pendencia[] = [
      { id: 10, titulo: 'Entregar RG', concluida: false, colaboradorId: 1 },
    ];
    vi.mocked(listarPendenciasColaborador).mockResolvedValueOnce(pendencias);

    vi.mocked(atualizarPendencia).mockResolvedValueOnce({
      id: 10,
      titulo: 'Entregar RG',
      concluida: true,
      colaboradorId: 1,
      dataConclusao: new Date().toISOString(),
    } as Pendencia);

    render(<ChecklistAdmissao colaborador={worker} />);

    await waitFor(() => {
      expect(screen.getByText('Entregar RG')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      expect(atualizarPendencia).toHaveBeenCalledWith(expect.objectContaining({ id: 10, concluida: true }));
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('deve mostrar toast de erro se falhar ao buscar pendências', async () => {
    vi.mocked(listarPendenciasColaborador).mockRejectedValueOnce(new Error('Falha'));

    await act(async () => {
      render(<ChecklistAdmissao colaborador={worker} />);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
